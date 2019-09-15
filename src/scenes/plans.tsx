import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { orderBy } from 'lodash'
import React from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import { NavigationStackScreenComponent } from 'react-navigation-stack'

import {
  Button,
  NavBar,
  Separator,
  Spinner,
  Touchable
} from '../components/common'
import { Plan } from '../components/plans'
import { Plan as IPlan, QueryPlansArgs } from '../graphql/types'
import { fonts, layout } from '../styles'

export const GET_PLANS = gql`
  query plans($radius: Int!) {
    plans(radius: $radius) {
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

const Plans: NavigationStackScreenComponent = ({
  navigation: { navigate }
}) => {
  const { data, loading, refetch } = useQuery<
    {
      plans: IPlan[]
    },
    QueryPlansArgs
  >(GET_PLANS, {
    variables: {
      radius: 20
    }
  })

  if (!data || !data.plans) {
    return <Spinner />
  }

  return (
    <FlatList
      contentContainerStyle={styles.content}
      data={orderBy(data.plans, ['expires', 'distance'], ['asc', 'asc'])}
      ItemSeparatorComponent={Separator}
      ListEmptyComponent={() => (
        <View style={styles.empty}>
          <Text style={styles.label}>
            There are no plans nearby. Why don't you create one?
          </Text>
          <Button label="Create a plan" onPress={() => navigate('Create')} />
        </View>
      )}
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
  header: () => <NavBar title="Plans within 20km" />
}

const styles = StyleSheet.create({
  content: {
    flexGrow: 1
  },
  empty: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    padding: layout.margin * 2
  },
  label: {
    ...fonts.regular,
    marginBottom: layout.margin,
    textAlign: 'center'
  }
})

export default Plans
