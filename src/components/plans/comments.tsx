import { orderBy } from 'lodash'
import React, { FunctionComponent } from 'react'
import { FlatList } from 'react-native'

import { Comment as IComment } from '../../graphql/types'
import { Separator } from '../common'
import Comment from './comment'

interface Props {
  comments: IComment[]
}

const Comments: FunctionComponent<Props> = ({ comments }) => {
  return (
    <FlatList
      data={orderBy(comments, 'created', 'desc')}
      inverted
      ItemSeparatorComponent={Separator}
      keyExtractor={({ id }) => id}
      renderItem={({ item }) => <Comment comment={item} />}
    />
  )
}

export default Comments
