import React, { FunctionComponent } from 'react'
import { ActivityIndicator, StyleSheet, View } from 'react-native'

import { colors, layout } from '../../styles'

const Spinner: FunctionComponent = () => {
  return (
    <View style={styles.main}>
      <ActivityIndicator color={colors.primary} size="large" />
    </View>
  )
}

const styles = StyleSheet.create({
  main: {
    alignItems: 'center',
    backgroundColor: colors.background,
    borderTopLeftRadius: layout.radius * 2,
    borderTopRightRadius: layout.radius * 2,
    flex: 1,
    justifyContent: 'center'
  }
})

export default Spinner
