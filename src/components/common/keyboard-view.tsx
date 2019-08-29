import React, { FunctionComponent } from 'react'
import { KeyboardAvoidingView, Platform, View } from 'react-native'

interface Props {
  style?: any
}

const KeyboardView: FunctionComponent<Props> = ({ children, style }) => {
  if (Platform.OS === 'android') {
    return <View style={style}>{children}</View>
  }

  return (
    <KeyboardAvoidingView style={style} behavior="padding">
      {children}
    </KeyboardAvoidingView>
  )
}

export default KeyboardView
