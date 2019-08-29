import React, { FunctionComponent, useEffect, useState } from 'react'
import { Image, Keyboard, SafeAreaView, StyleSheet } from 'react-native'
import { BottomTabBarProps } from 'react-navigation'

import { nav } from '../../assets'
import { colors, layout, shadow } from '../../styles'

import Touchable from './touchable'

interface Props {
  onTabPress: any
}

const TabBar: FunctionComponent<BottomTabBarProps & Props> = ({
  onTabPress,
  navigation: {
    state: { index, routes }
  }
}) => {
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    const keyboardWillHide = Keyboard.addListener('keyboardWillHide', () =>
      setHidden(false)
    )
    const keyboardWillShow = Keyboard.addListener('keyboardWillShow', () =>
      setHidden(true)
    )

    return () => {
      keyboardWillHide.remove()
      keyboardWillShow.remove()
    }
  })

  if (hidden) {
    return null
  }

  return (
    <SafeAreaView style={styles.main}>
      {routes.map((route, current) => {
        const { key } = route
        const active = index === current

        return (
          <Touchable
            style={styles.tab}
            key={key}
            onPress={() =>
              onTabPress({
                route
              })
            }>
            <Image
              style={[styles.icon, active && styles.active]}
              source={nav[key]}
            />
          </Touchable>
        )
      })}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  main: {
    backgroundColor: colors.primary,
    flexDirection: 'row'
  },
  tab: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    padding: layout.margin
  },
  icon: {
    height: layout.iconHeight,
    opacity: 0.25,
    width: layout.iconHeight
  },
  active: {
    opacity: 1
  }
})

export default TabBar
