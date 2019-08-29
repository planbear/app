import moment from 'moment'
import React, { FunctionComponent } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'

import { planMeta, planType } from '../../assets'
import { Plan as IPlan } from '../../graphql/types'
import { geo } from '../../lib'
import { colors, fonts, layout } from '../../styles'
import { Touchable } from '../common'

interface Props {
  plan: IPlan

  onPress: any
}

const Plan: FunctionComponent<Props> = ({
  plan: {
    description,
    expires,
    max,
    meta: { comments, distance, going },
    status,
    time,
    type,
    user: { name }
  },
  onPress
}) => {
  return (
    <Touchable style={styles.main} onPress={onPress}>
      <Image style={styles.hero} source={planType[type]} />
      <View style={styles.details}>
        <Text style={styles.description}>{description}</Text>
        <View style={styles.meta}>
          <View style={styles.item}>
            <Image style={styles.icon} source={planMeta.going} />
            <Text style={styles.label}>
              {going}
              {max && `/${max}`}
            </Text>
          </View>
          <View style={styles.item}>
            <Image style={styles.icon} source={planMeta.comments} />
            <Text style={styles.label}>{comments}</Text>
          </View>
          <View style={styles.item}>
            <Image style={styles.icon} source={planMeta.distance} />
            <Text style={styles.label}>{geo.distance(distance)}</Text>
          </View>
        </View>
        <View style={styles.meta}>
          <View style={styles.item}>
            <Text style={styles.time}>{moment(time).fromNow()}</Text>
          </View>
          {!!expires && (
            <View style={styles.item}>
              <Text style={styles.time}>
                Expires {moment(expires).fromNow()}
              </Text>
            </View>
          )}
        </View>
      </View>
    </Touchable>
  )
}

const styles = StyleSheet.create({
  main: {
    alignItems: 'center',
    flexDirection: 'row',
    padding: layout.margin
  },
  hero: {
    height: layout.iconHeight * 2,
    width: layout.iconHeight * 2
  },
  details: {
    flex: 1,
    marginLeft: layout.margin
  },
  description: {
    ...fonts.regular
  },
  meta: {
    alignItems: 'center',
    flexDirection: 'row',
    marginLeft: -layout.margin,
    marginTop: layout.margin
  },
  item: {
    alignItems: 'center',
    flexDirection: 'row',
    marginLeft: layout.margin
  },
  icon: {
    height: layout.iconHeight,
    width: layout.iconHeight
  },
  label: {
    ...fonts.small,
    color: colors.textLight,
    marginLeft: layout.padding
  },
  time: {
    ...fonts.small,
    color: colors.textLight
  }
})

export default Plan
