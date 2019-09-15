import { orderBy } from 'lodash'
import React, { FunctionComponent } from 'react'
import { FlatList, StyleSheet } from 'react-native'

import { Plan } from '../../graphql/types'
import { Empty, Separator } from '../common'
import Comment from './comment'
import Reply from './reply'

interface Props {
  plan: Plan
  refreshing: boolean

  refetch: any
}

const Comments: FunctionComponent<Props> = ({ plan, refreshing, refetch }) => {
  const { comments } = plan

  return (
    <>
      <FlatList
        contentContainerStyle={styles.content}
        data={orderBy(comments, 'created', 'desc')}
        inverted
        ItemSeparatorComponent={Separator}
        keyExtractor={({ id }) => id}
        ListEmptyComponent={<Empty message="No comments yet" flipped />}
        onRefresh={refetch}
        refreshing={refreshing}
        renderItem={({ item }) => <Comment comment={item} plan={plan} />}
      />
      <Reply plan={plan} />
    </>
  )
}

const styles = StyleSheet.create({
  content: {
    flexGrow: 1
  }
})

export default Comments
