import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import React, { FunctionComponent, useState } from 'react'
import { ActivityIndicator, Image, StyleSheet, View } from 'react-native'

import { img_send } from '../../assets'
import { Comment, MutationCreateCommentArgs, Plan } from '../../graphql/types'
import { GET_PLAN } from '../../scenes/plan'
import { colors, layout } from '../../styles'
import { TextBox, Touchable } from '../common'

interface Props {
  plan: Plan
}

export interface CreateCommentData {
  createComment: Comment
}

const CREATE_COMMENT = gql`
  mutation createComment($planId: ID!, $body: String!) {
    createComment(planId: $planId, body: $body) {
      id
      body
      pinned
      user {
        id
        name
      }
      created
    }
  }
`

const Reply: FunctionComponent<Props> = ({ plan }) => {
  const [body, setBody] = useState('')

  const [createComment, { loading }] = useMutation<
    CreateCommentData,
    MutationCreateCommentArgs
  >(CREATE_COMMENT, {
    update(proxy, { data }) {
      if (data) {
        const { createComment } = data

        proxy.writeQuery({
          query: GET_PLAN,
          data: {
            plan: {
              ...plan,
              comments: [...(plan.comments || []), createComment]
            }
          }
        })
      }
    },
    variables: {
      body,
      planId: plan.id
    }
  })

  return (
    <View style={styles.main}>
      <TextBox
        style={styles.textBox}
        onChangeText={body => setBody(body)}
        placeholder="Say something nice"
        value={body}
      />
      <Touchable
        style={styles.button}
        onPress={() => {
          if (body) {
            createComment()
          }
        }}>
        {!loading && <Image style={styles.icon} source={img_send} />}
        {loading && <ActivityIndicator color={colors.primary} size="small" />}
      </Touchable>
    </View>
  )
}

const styles = StyleSheet.create({
  main: {
    borderTopColor: colors.border,
    borderTopWidth: layout.border,
    flexDirection: 'row'
  },
  textBox: {
    borderWidth: 0,
    flex: 1
  },

  button: {
    alignItems: 'center',
    height: layout.textBoxHeight,
    justifyContent: 'center',
    width: layout.textBoxHeight
  },
  icon: {
    height: layout.iconHeight,
    width: layout.iconHeight
  }
})

export default Reply
