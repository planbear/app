import { useLazyQuery, useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { get } from 'lodash'
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { SceneMap, TabView } from 'react-native-tab-view'
import { NavigationStackScreenComponent } from 'react-navigation-stack'

import { Button, NavBar, Spinner } from '../components/common'
import { Comments, Members, TabBar, Plan as VPlan } from '../components/plans'
import {
  Plan as IPlan,
  LocationInput,
  MutationJoinPlanArgs,
  PlanStatus,
  QueryPlanArgs
} from '../graphql/types'
import { geo } from '../lib'
import { colors, fonts, layout } from '../styles'

interface Props {
  planId: string
  title?: string
}

export const GET_PLAN = gql`
  query plan($planId: ID!, $location: LocationInput!) {
    plan(planId: $planId, location: $location) {
      id
      comments {
        id
        body
        created
        pinned
        user {
          id
          name
        }
      }
      description
      expires
      meta {
        comments
        distance
        going
        max
      }
      members {
        approved
        id
        owner
        joined
        name
      }
      status
      time
      type
      user {
        id
        name
      }
      created
      updated
    }
  }
`

export const JOIN_PLAN = gql`
  mutation joinPlan($planId: ID!, $location: LocationInput!) {
    joinPlan(planId: $planId, location: $location) {
      id
    }
  }
`

const initialState = {
  index: 0,
  routes: [
    {
      key: 'Comments'
    },
    {
      key: 'People'
    }
  ]
}

const Plan: NavigationStackScreenComponent<Props> = ({
  navigation: { getParam, setParams }
}) => {
  const planId = getParam('planId')

  const [state, setState] = useState(initialState)
  const [location, setLocation] = useState<LocationInput>()

  const [getPlan, { data, loading, refetch }] = useLazyQuery<
    {
      plan: IPlan
    },
    QueryPlanArgs
  >(GET_PLAN, {
    onCompleted(data) {
      if (!getParam('title')) {
        const {
          plan: {
            type,
            user: { name }
          }
        } = data

        setParams({
          title: `${name}'s ${type.replace(/_/g, ' ')} plan`
        })
      }
    }
  })

  const [joinPlan, { loading: loadingJoinPlan }] = useMutation<
    {
      joinPlan: IPlan
    },
    MutationJoinPlanArgs
  >(JOIN_PLAN)

  useEffect(() => {
    const fetch = async () => {
      const location = await geo.location()

      setLocation(location)

      getPlan({
        variables: {
          location,
          planId
        }
      })
    }

    fetch()
  }, [getPlan, planId])

  if (!data || !data.plan) {
    return <Spinner />
  }

  const {
    plan: { status }
  } = data

  const { index, routes } = state

  const onIndexChange = (index: number) =>
    setState({
      ...initialState,
      index
    })

  return (
    <View style={styles.main}>
      <VPlan plan={data.plan} />
      {status === PlanStatus.New && (
        <View style={styles.action}>
          <Text style={styles.message}>Would you like to join this plan?</Text>
          <Button
            style={styles.button}
            label="Request to join"
            loading={loadingJoinPlan}
            onPress={() => {
              if (location) {
                joinPlan({
                  variables: {
                    location,
                    planId
                  }
                })
              }
            }}
          />
        </View>
      )}
      {status === PlanStatus.Requested && (
        <View style={styles.action}>
          <Text style={styles.message}>
            You've requested to join this plan. Please wait for them to review
            your request.
          </Text>
        </View>
      )}
      {status === PlanStatus.Joined && (
        <TabView
          navigationState={state}
          onIndexChange={onIndexChange}
          renderScene={SceneMap({
            Comments: () => (
              <Comments
                plan={data.plan}
                refetch={refetch}
                refreshing={loading}
              />
            ),
            People: () => (
              <Members
                plan={data.plan}
                refetch={refetch}
                refreshing={loading}
              />
            )
          })}
          renderTabBar={() => (
            <TabBar
              comments={get(data, 'plan.comments.length', 0)}
              index={index}
              onIndexChange={onIndexChange}
              people={get(data, 'plan.members.length', 0)}
              routes={routes}
            />
          )}
        />
      )}
    </View>
  )
}

Plan.navigationOptions = ({ navigation: { getParam } }) => ({
  header: () => <NavBar back title={getParam('title', 'Plan')} />
})

const styles = StyleSheet.create({
  main: {
    flex: 1
  },
  action: {
    alignItems: 'center',
    borderTopColor: colors.border,
    borderTopWidth: StyleSheet.hairlineWidth,
    flexGrow: 1,
    justifyContent: 'center',
    padding: layout.margin
  },
  message: {
    ...fonts.regular,
    textAlign: 'center'
  },
  button: {
    marginTop: layout.margin
  }
})

export default Plan
