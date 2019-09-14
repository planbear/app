import { range } from 'lodash'
import moment, { Moment } from 'moment'
import React, { FunctionComponent, useEffect, useState } from 'react'
import {
  Image,
  Picker,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle
} from 'react-native'

import { img_close, img_expand } from '../../assets'
import { colors, fonts, layout, weights } from '../../styles'
import Modal from './modal'
import Touchable from './touchable'

export interface LabelValue {
  label: string
  value: string
}

interface Props {
  max?: Moment
  placeholder?: string
  style?: StyleProp<ViewStyle>
  value?: Moment

  onChange: (date: Moment) => void
}

const DateTimePicker: FunctionComponent<Props> = ({
  max,
  placeholder,
  style,
  value,
  onChange
}) => {
  const [day, setDay] = useState(moment().get('dayOfYear'))
  const [time, setTime] = useState()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (day && time) {
      const nextDate = moment(value)
      const currentTime = moment(time)

      nextDate.set('dayOfYear', day)
      nextDate.set('hour', currentTime.get('hour'))
      nextDate.set('minutes', currentTime.get('minutes'))

      onChange(nextDate)
    }
  }, [day, time])

  let days = range(20).map(index => moment().add(index, 'days'))
  let times = range(48).map(index =>
    moment()
      .startOf('day')
      .add(index * 30, 'minutes')
  )

  if (max) {
    const dayCut = days.findIndex(day => day.isAfter(max))

    days = days.slice(0, dayCut)

    if (Number(day) === max.get('dayOfYear')) {
      const timeCut = times.findIndex(
        time =>
          time.get('hours') >= max.get('hours') &&
          time.get('minutes') >= max.get('minutes')
      )

      times = times.slice(0, timeCut)
    }
  }

  if (Number(day) === moment().get('dayOfYear')) {
    const timeCut = times.findIndex(time => time.isAfter())

    times = times.slice(timeCut, times.length)
  }

  return (
    <>
      <Touchable style={[styles.main, style]} onPress={() => setVisible(true)}>
        <Text style={[styles.label, value && styles.date]}>
          {value ? value.format('LLL') : placeholder}
        </Text>
        <Image style={[styles.icon, styles.expand]} source={img_expand} />
      </Touchable>
      <Modal
        style={styles.modal}
        onRequestClose={() => setVisible(false)}
        visible={visible}>
        <View style={styles.header}>
          <Text style={styles.title}>Pick a date and time</Text>
          <Touchable style={styles.close} onPress={() => setVisible(false)}>
            <Image style={styles.icon} source={img_close} />
          </Touchable>
        </View>
        <View style={styles.content}>
          <Picker
            style={styles.picker}
            onValueChange={day => setDay(day)}
            selectedValue={day}>
            {days.map((date, index) => (
              <Picker.Item
                key={index}
                label={date.format('MMM D')}
                value={date.format('DDD')}
              />
            ))}
          </Picker>
          {day && (
            <Picker
              style={styles.picker}
              onValueChange={time => setTime(time)}
              selectedValue={time}>
              {times.map((date, index) => (
                <Picker.Item
                  key={index}
                  label={date.format('h:mm a')}
                  value={date.valueOf()}
                />
              ))}
            </Picker>
          )}
        </View>
      </Modal>
    </>
  )
}

const styles = StyleSheet.create({
  main: {
    alignItems: 'center',
    borderColor: colors.border,
    borderRadius: layout.radius,
    borderWidth: layout.border,
    flexDirection: 'row',
    height: layout.textBoxHeight,
    paddingHorizontal: layout.margin * (3 / 4)
  },
  label: {
    ...fonts.regular,
    color: colors.textLight,
    flex: 1
  },
  date: {
    color: colors.text
  },
  icon: {
    height: layout.iconHeight,
    width: layout.iconHeight
  },
  expand: {
    marginLeft: layout.margin
  },
  modal: {
    width: '80%'
  },
  header: {
    backgroundColor: colors.backgroundDark,
    flexDirection: 'row'
  },
  title: {
    ...fonts.regular,
    ...weights.semibold,
    flex: 1,
    padding: layout.margin
  },
  close: {
    padding: layout.margin
  },
  content: {
    flexDirection: 'row'
  },
  picker: {
    flex: 1
  }
})

export default DateTimePicker
