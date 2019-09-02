import moment from 'moment'
import React, { FunctionComponent } from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { Member as IMember } from '../../graphql/types'
import { colors, fonts, layout } from '../../styles'
import { Avatar } from '../common'

interface Props {
  member: IMember
}

const Member: FunctionComponent<Props> = ({
  member: { approved, id, joined, name }
}) => {
  return (
    <View style={styles.main}>
      <Avatar id={id} />
      <View style={styles.details}>
        <Text style={styles.name}>{name}</Text>
        <View style={styles.meta}>
          <Text style={styles.joined}>
            {approved ? 'Joined' : 'Requested'} {moment(joined).fromNow()}
          </Text>
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
    height: layout.heroHeight,
    width: layout.heroHeight
  },
  details: {
    flex: 1,
    marginLeft: layout.margin
  },
  name: {
    ...fonts.regular
  },
  meta: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: layout.padding
  },
  joined: {
    ...fonts.small,
    color: colors.textLight
  }
})

export default Member
