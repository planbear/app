import { get } from 'lodash'
import React, { FunctionComponent } from 'react'
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'

import { colors, fonts, layout } from '../../styles'
import Touchable from './touchable'

interface Props {
  color?: string
  ghost?: boolean
  label: string
  loading?: boolean
  style?: any
  styleLabel?: any

  onPress?: () => void
}

const getButtonStyle = (color: any, ghost?: boolean) => {
  if (ghost) {
    return {
      borderColor: get(colors, color, colors.primary),
      borderWidth: layout.border
    }
  }

  return {
    backgroundColor: get(colors, color, colors.primary)
  }
}

const getLabelStyle = (color: any, ghost?: boolean) => {
  if (ghost) {
    return {
      color: get(colors, color, colors.primary)
    }
  }

  return {
    color: colors.background
  }
}

const getSpinnerColor = (color: any, ghost?: boolean) => {
  if (ghost) {
    return get(colors, color, colors.primary)
  }

  return colors.background
}

const Button: FunctionComponent<Props> = ({
  color,
  ghost,
  label,
  loading,
  onPress,
  style,
  styleLabel
}) => {
  if (loading) {
    return (
      <View style={[styles.main, getButtonStyle(color, ghost), style]}>
        <ActivityIndicator color={getSpinnerColor(color, ghost)} />
      </View>
    )
  }

  return (
    <Touchable
      style={[styles.main, getButtonStyle(color, ghost), style]}
      onPress={onPress}>
      <Text style={[styles.label, getLabelStyle(color, ghost), styleLabel]}>
        {label}
      </Text>
    </Touchable>
  )
}

const styles = StyleSheet.create({
  main: {
    alignItems: 'center',
    borderRadius: layout.radius,
    height: layout.buttonHeight,
    justifyContent: 'center',
    paddingHorizontal: layout.margin
  },
  label: {
    ...fonts.regular
  }
})

export default Button
