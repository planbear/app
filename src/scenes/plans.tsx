import { useLazyQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { orderBy } from 'lodash'
import React, { useEffect } from 'react'
import { FlatList, StyleSheet } from 'react-native'
import { NavigationScreenComponent } from 'react-navigation'

import { NavBar, Separator, Spinner, Touchable } from '../components/common'
import { Plan } from '../components/plans'
import { Plan as IPlan, QueryPlansArgs } from '../graphql/types'
import { geo } from '../lib'
import { colors, layout } from '../styles'

export interface GetPlansData {
  plans: IPlan[]
}

export const GET_PLANS = gql`
  query plans($location: LocationInput!, $radius: Int!) {
    plans(location: $location, radius: $radius) {
      id
      description
      expires
      meta {
        comments
        distance
        going
        max
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

const Plans: NavigationScreenComponent = ({ navigation: { navigate } }) => {
  const [getPlans, { data, loading, refetch }] = useLazyQuery<
    GetPlansData,
    QueryPlansArgs
  >(GET_PLANS)

  useEffect(() => {
    const fetch = async () => {
      const location = await geo.location()

      getPlans({
        variables: {
          location,
          radius: 20
        }
      })
    }

    fetch()
  }, [])

  if (!data || !data.plans) {
    return <Spinner />
  }

  return (
    <FlatList
      style={styles.main}
      data={orderBy(data.plans, ['expires', 'distance'], ['asc', 'asc'])}
      ItemSeparatorComponent={Separator}
      onRefresh={refetch}
      refreshing={loading}
      renderItem={({ item }) => (
        <Touchable
          onPress={() =>
            navigate('Plan', {
              planId: item.id
            })
          }>
          <Plan plan={item} />
        </Touchable>
      )}
    />
  )
}

Plans.navigationOptions = {
  header: <NavBar title="Plans within 20km" />
}

const styles = StyleSheet.create({
  main: {
    backgroundColor: colors.background,
    borderTopLeftRadius: layout.radius * 2,
    borderTopRightRadius: layout.radius * 2
  }
})

export default Plans
