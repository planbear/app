import { orderBy } from 'lodash'
import React, { FunctionComponent } from 'react'
import { FlatList } from 'react-native'

import { Member as IMember } from '../../graphql/types'
import { Separator } from '../common'
import Member from './member'

interface Props {
  members: IMember[]
}

const Members: FunctionComponent<Props> = ({ members }) => {
  return (
    <FlatList
      data={orderBy(members, ['owner', 'joined'], ['desc', 'desc'])}
      ItemSeparatorComponent={Separator}
      keyExtractor={({ id }) => id}
      renderItem={({ item }) => <Member member={item} />}
    />
  )
}

export default Members
