import React, { FunctionComponent, useState } from 'react'
import {
  Dimensions,
  FlatList,
  Image,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle
} from 'react-native'

import { img_close, img_expand } from '../../assets'
import { colors, fonts, layout, weights } from '../../styles'
import Modal from './modal'
import Separator from './separator'
import Touchable from './touchable'

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
        <Text style={[styles.label, selected && styles.selected]}>
          {selected ? selected.label : placeholder}
        </Text>
        <Image style={[styles.icon, styles.expand]} source={img_expand} />
      </Touchable>
      <Modal onRequestClose={() => setVisible(false)} visible={visible}>
        <FlatList
          style={styles.list}
          data={data}
          ItemSeparatorComponent={Separator}
          ListHeaderComponent={() => (
            <View style={styles.header}>
              <Text style={styles.title}>{placeholder}</Text>
              <Touchable style={styles.close} onPress={() => setVisible(false)}>
                <Image style={styles.icon} source={img_close} />
              </Touchable>
            </View>
          )}
          keyExtractor={({ value }) => value}
          renderItem={({ item }) => (
            <Touchable
              style={styles.item}
              onPress={() => {
                onChange(item)
                setVisible(false)
              }}>
              <Text style={styles.itemLabel}>{item.label}</Text>
            </Touchable>
          )}
        />
      </Modal>
    </>
  )
}

const { width } = Dimensions.get('window')

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
  list: {
    backgroundColor: colors.backgroundDark,
    flexGrow: 0,
    width: width * 0.75
  },
  header: {
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
    backgroundColor: colors.background,
    padding: layout.margin
  },
  itemLabel: {
    ...fonts.regular
  }
})

export default Picker
