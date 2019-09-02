import moment from 'moment'
import React, { FunctionComponent } from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { Comment as IComment } from '../../graphql/types'
import { colors, fonts, layout } from '../../styles'
import { Avatar } from '../common'

interface Props {
  comment: IComment
}

const Comment: FunctionComponent<Props> = ({
  comment: {
    created,
    body,
    user: { id, name }
  }
}) => {
  return (
    <View style={styles.main}>
      <Avatar id={id} />
      <View style={styles.details}>
        <Text style={styles.body}>{body}</Text>
        <View style={styles.meta}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.time}>{moment(created).fromNow()}</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  main: {
    alignItems: 'center',
    flexDirection: 'row',
    padding: layout.margin
  },
  hero: {
    height: layout.avatarHeight,
    width: layout.avatarHeight
  },
  details: {
    flex: 1,
    marginLeft: layout.margin
  },
  body: {
    ...fonts.regular
  },
  meta: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: layout.padding
  },
  name: {
    ...fonts.small,
    color: colors.textLight
  },
  time: {
    ...fonts.small,
    color: colors.textLight,
    marginLeft: layout.padding
  }
})

export default Comment
