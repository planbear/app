import Identicon from 'identicon.js'
import React, { FunctionComponent } from 'react'
import { Image, StyleSheet } from 'react-native'

import { colors, layout } from '../../styles'

interface Props {
  id: string
  style?: any
}

const Avatar: FunctionComponent<Props> = ({ id, style }) => {
  const uri = new Identicon(id, {
    format: 'png',
    margin: 0,
    size: 200
  }).toString()

  return (
    <Image
      style={styles.main}
      source={{
        // uri: `data:image/png;base64,${uri}`
        uri: `https://i.pravatar.cc/300?u=${id}`
      }}
    />
  )
}

const styles = StyleSheet.create({
  main: {
    backgroundColor: colors.backgroundDark,
    borderRadius: layout.radius,
    height: layout.avatarHeight,
    width: layout.avatarHeight
  }
})

export default Avatar
