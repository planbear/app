import { orderBy } from 'lodash'
import React, { FunctionComponent } from 'react'
import { FlatList } from 'react-native'

import { Plan } from '../../graphql/types'
import { Separator } from '../common'
import Member from './member'

interface Props {
  plan: Plan
  refreshing: boolean

  refetch: any
}

const Members: FunctionComponent<Props> = ({ plan, refreshing, refetch }) => {
  const { members } = plan

  return (
    <FlatList
      data={orderBy(members, ['owner', 'joined'], ['desc', 'desc'])}
      ItemSeparatorComponent={Separator}
      keyExtractor={({ id }) => id}
      onRefresh={refetch}
      refreshing={refreshing}
      renderItem={({ item }) => <Member member={item} plan={plan} />}
    />
  )
}

export default Members
