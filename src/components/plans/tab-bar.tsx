import React, { FunctionComponent } from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { colors, fonts, layout, weights } from '../../styles'
import { Touchable } from '../common'

interface Props {
  comments: number
  index: number
  people: number
  routes: {
    key: string
  }[]

  onIndexChange(index: number): void
}

const TabBar: FunctionComponent<Props> = ({
  comments,
  index,
  people,
  routes,
  onIndexChange
}) => {
  return (
    <View style={styles.main}>
      {routes.map(({ key }, current) => (
        <Touchable
          key={current}
          onPress={() => index !== current && onIndexChange(current)}>
          <Text style={[styles.label, index === current && styles.current]}>
            {key}
            {['Comments', 'People'].includes(key) &&
              ` (${key === 'Comments' ? comments : people})`}
          </Text>
        </Touchable>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  main: {
    backgroundColor: colors.backgroundDark,
    flexDirection: 'row'
  },
  label: {
    ...fonts.small,
    color: colors.textLight,
    margin: layout.margin
  },
  current: {
    ...weights.semibold,
    color: colors.primaryDark
  }
})

export default TabBar
