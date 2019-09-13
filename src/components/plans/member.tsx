import moment from 'moment'
import React, { FunctionComponent } from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { Member as IMember } from '../../graphql/types'
import { session } from '../../lib'
import { colors, fonts, layout, weights } from '../../styles'
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
      {id === session.userId && <Text style={styles.you}>YOU</Text>}
    </View>
  )
}

const styles = StyleSheet.create({
  main: {
    alignItems: 'center',
    flexDirection: 'row',
    padding: layout.margin
  },
  details: {
    flex: 1,
    marginHorizontal: layout.margin
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
  },
  you: {
    ...fonts.small,
    ...weights.semibold,
    backgroundColor: colors.primary,
    borderRadius: layout.radius,
    color: colors.background,
    padding: layout.padding / 2
  }
})

export default Member
