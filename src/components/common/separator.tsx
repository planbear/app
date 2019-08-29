import React, { FunctionComponent } from 'react'
import { StyleSheet, View } from 'react-native'

import { colors } from '../../styles'

const Separator: FunctionComponent = () => {
  return <View style={styles.main} />
}

const styles = StyleSheet.create({
  main: {
    backgroundColor: colors.border,
    height: StyleSheet.hairlineWidth
  }
})

export default Separator
