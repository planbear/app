import React, { FunctionComponent } from 'react'
import { ActivityIndicator, StyleSheet, View } from 'react-native'

import { colors } from '../../styles'

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
    flex: 1,
    justifyContent: 'center'
  }
})

export default Spinner
