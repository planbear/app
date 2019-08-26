import React, { FunctionComponent } from 'react'
import { Image, SafeAreaView, StyleSheet } from 'react-native'

import { planbear } from './assets'

const PlanBear: FunctionComponent = () => {
  return (
    <SafeAreaView style={styles.main}>
      <Image style={styles.planbear} source={planbear} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  main: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center'
  },
  planbear: {
    height: 180 / 2,
    width: 200 / 2
  }
})

export default PlanBear
