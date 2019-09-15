import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import moment from 'moment'
import React, { FunctionComponent } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import Swipeable from 'react-native-gesture-handler/Swipeable'

import { memberActions } from '../../assets'
import {
  Comment as IComment,
  MutationRemoveCommentArgs,
  Plan
} from '../../graphql/types'
import { session } from '../../lib'
import { GET_PLAN } from '../../scenes/plan'
import { colors, fonts, layout } from '../../styles'
import { client } from '../..'
import { Avatar, Touchable } from '../common'
import { actions } from './member'

interface Props {
  comment: IComment
  plan: Plan
}

export const REMOVE_COMMENT = gql`
  mutation removeComment($planId: ID!, $commentId: ID!) {
    removeComment(planId: $planId, commentId: $commentId) {
      success
    }
  }
`

const Comment: FunctionComponent<Props> = ({
  comment: {
    body,
    created,
    id,
    user: { id: userId, name }
  },
  plan: { id: planId, user }
}) => {
  const [remove] = useMutation<any, MutationRemoveCommentArgs>(REMOVE_COMMENT, {
    variables: {
      planId,
      commentId: id
    },
    async onCompleted() {
      const { plan } = client.readQuery({
        query: GET_PLAN,
        variables: {
          planId
        }
      }) as {
        plan: Plan
      }

      const comments = (plan.comments || []).filter(
        comment => comment.id !== id
      )

      client.writeQuery({
        data: {
          plan: {
            ...plan,
            comments: [...comments]
          }
        },
        query: GET_PLAN,
        variables: {
          planId
        }
      })
    }
  })

  return (
    <Swipeable
      childrenContainerStyle={styles.main}
      renderLeftActions={() => {
        if (user.id !== session.userId) {
          return null
        }

        return (
          <View style={actions.main}>
            <Touchable style={[actions.action, actions.block]} onPress={remove}>
              <Image style={actions.icon} source={memberActions.block} />
              <Text style={actions.label}>Remove</Text>
            </Touchable>
          </View>
        )
      }}>
      <Avatar id={userId} />
      <View style={styles.details}>
        <Text style={styles.body}>{body}</Text>
        <View style={styles.meta}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.time}>{moment(created).fromNow()}</Text>
        </View>
      </View>
    </Swipeable>
  )
}

const styles = StyleSheet.create({
  main: {
    alignItems: 'center',
    backgroundColor: colors.background,
    flexDirection: 'row',
    padding: layout.margin
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
