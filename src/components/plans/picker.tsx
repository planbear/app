import React, { FunctionComponent, useState } from 'react'
import {
  FlatList,
  Image,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle
} from 'react-native'

import { img_check, img_close, img_expand, planType } from '../../assets'
import { colors, fonts, layout, weights } from '../../styles'
import { Modal, Separator, Touchable } from '../common'

export interface LabelValue {
  label: string
  value: string
}

interface Props {
  data: LabelValue[]
  selected?: LabelValue
  placeholder?: string
  style?: StyleProp<ViewStyle>

  onChange: (item: LabelValue) => void
}

const Picker: FunctionComponent<Props> = ({
  data,
  placeholder,
  selected,
  style,
  onChange
}) => {
  const [visible, setVisible] = useState(false)

  return (
    <>
      <Touchable style={[styles.main, style]} onPress={() => setVisible(true)}>
        {selected && (
          <Image
            style={[styles.icon, styles.selectedIcon]}
            source={planType[selected.value]}
          />
        )}
        <Text style={[styles.label, selected && styles.selected]}>
          {selected ? selected.label : placeholder}
        </Text>
        <Image style={[styles.icon, styles.expand]} source={img_expand} />
      </Touchable>
      <Modal
        style={styles.modal}
        onRequestClose={() => setVisible(false)}
        visible={visible}>
        <View style={styles.header}>
          <Text style={styles.title}>{placeholder}</Text>
          <Touchable style={styles.close} onPress={() => setVisible(false)}>
            <Image style={styles.icon} source={img_close} />
          </Touchable>
        </View>
        <FlatList
          data={data}
          ItemSeparatorComponent={Separator}
          keyExtractor={({ value }) => value}
          renderItem={({ item }) => (
            <Touchable
              style={styles.item}
              onPress={() => {
                onChange(item)
                setVisible(false)
              }}>
              <Image style={styles.icon} source={planType[item.value]} />
              <Text style={styles.itemLabel}>{item.label}</Text>
              {selected && selected.value === item.value && (
                <Image style={styles.icon} source={img_check} />
              )}
            </Touchable>
          )}
        />
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
  selectedIcon: {
    marginRight: layout.padding
  },
  selected: {
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
    alignItems: 'center',
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
  item: {
    alignItems: 'center',
    flexDirection: 'row',
    padding: layout.margin
  },
  itemLabel: {
    ...fonts.regular,
    flex: 1,
    marginHorizontal: layout.padding
  }
})

export default Picker
