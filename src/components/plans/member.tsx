import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import moment from 'moment'
import React, { FunctionComponent, useState } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import Swipeable from 'react-native-gesture-handler/Swipeable'

import { memberActions } from '../../assets'
import {
  Member as IMember,
  MutationApproveMemberArgs,
  MutationBlockMemberArgs,
  Plan
} from '../../graphql/types'
import { session } from '../../lib'
import { GET_PLAN } from '../../scenes/plan'
import { colors, fonts, layout, weights } from '../../styles'
import { client } from '../..'
import { Avatar, Touchable } from '../common'
import RateUser from './rate-user'

interface Props {
  member: IMember
  plan: Plan
}

export const APPROVE_MEMBER = gql`
  mutation approveMember($planId: ID!, $userId: ID!) {
    approveMember(planId: $planId, userId: $userId) {
      approved
    }
  }
`

export const BLOCK_MEMBER = gql`
  mutation blockMember($planId: ID!, $userId: ID!) {
    blockMember(planId: $planId, userId: $userId) {
      success
    }
  }
`

const Member: FunctionComponent<Props> = ({ member, plan }) => {
  const { approved, id, joined, name } = member
  const { id: planId, time, user } = plan

  const [ratingVisible, setRatingVisible] = useState(false)

  const [approve] = useMutation<
    {
      approveMember: IMember
    },
    MutationApproveMemberArgs
  >(APPROVE_MEMBER, {
    variables: {
      planId,
      userId: id
    },
    async onCompleted({ approveMember }) {
      const { plan } = client.readQuery({
        query: GET_PLAN,
        variables: {
          planId
        }
      }) as {
        plan: Plan
      }

      const members = (plan.members || []).filter(member => member.id !== id)
      const member = (plan.members || []).find(member => member.id === id)

      client.writeQuery({
        data: {
          plan: {
            ...plan,
            members: [
              ...members,
              {
                ...member,
                ...approveMember
              }
            ]
          }
        },
        query: GET_PLAN,
        variables: {
          planId
        }
      })
    }
  })
  const [block] = useMutation<any, MutationBlockMemberArgs>(BLOCK_MEMBER, {
    variables: {
      planId,
      userId: id
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

      const members = (plan.members || []).filter(member => member.id !== id)

      client.writeQuery({
        data: {
          plan: {
            ...plan,
            members: [...members]
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
        if (id === session.userId) {
          return null
        }

        const over = moment().isAfter(time)

        return (
          <View style={actions.main}>
            {!over && (
              <>
                {!approved && user.id === session.userId && (
                  <Touchable
                    style={[actions.action, actions.approve]}
                    onPress={approve}>
                    <Image
                      style={actions.icon}
                      source={memberActions.approve}
                    />
                    <Text style={actions.label}>Approve</Text>
                  </Touchable>
                )}
                {user.id === session.userId && (
                  <Touchable
                    style={[actions.action, actions.block]}
                    onPress={block}>
                    <Image style={actions.icon} source={memberActions.block} />
                    <Text style={actions.label}>Remove</Text>
                  </Touchable>
                )}
              </>
            )}
            {over && user.id === session.userId && (
              <>
                <Touchable
                  style={[actions.action, actions.rate]}
                  onPress={() => setRatingVisible(true)}>
                  <Image style={actions.icon} source={memberActions.rate} />
                  <Text style={actions.label}>Rate</Text>
                </Touchable>
                <RateUser
                  member={member}
                  onClose={() => setRatingVisible(false)}
                  plan={plan}
                  visible={ratingVisible}
                />
              </>
            )}
          </View>
        )
      }}>
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

const actions = StyleSheet.create({
  main: {
    flexDirection: 'row'
  },
  action: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: layout.margin
  },
  approve: {
    backgroundColor: colors.green
  },
  block: {
    backgroundColor: colors.red
  },
  rate: {
    backgroundColor: colors.blue
  },
  icon: {
    height: layout.iconHeight,
    width: layout.iconHeight
  },
  label: {
    ...fonts.small,
    color: colors.background,
    marginTop: layout.padding
  }
})

export default Member
