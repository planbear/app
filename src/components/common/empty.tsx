import React, { FunctionComponent } from 'react'
import { StyleSheet, Text, View } from 'react-native'

interface Props {
  flipped?: boolean
  message: string
}

const Empty: FunctionComponent<Props> = ({ flipped, message }) => {
  return (
    <View style={styles.main}>
      <Text style={flipped && styles.flipped}>{message}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  main: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center'
  },
  flipped: {
    transform: [
      {
        scaleY: -1
      }
    ]
  }
})

export default Empty
