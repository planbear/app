import { ApolloProvider } from '@apollo/react-hooks'
import React, { FunctionComponent, useEffect, useState } from 'react'
import { StyleSheet } from 'react-native'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs'

import { KeyboardView, Spinner, TabBar } from './components/common'
import { client } from './graphql'
import { nav, session } from './lib'
import {
  Create,
  Landing,
  Login,
  Notifications,
  Plan,
  Plans,
  Profile,
  Register
} from './scenes'

const PlanBear: FunctionComponent = () => {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const auth = async () => {
      await session.init()

      setLoading(false)
    }

    auth()
  })

  if (loading) {
    return <Spinner />
  }

  const LandingNavigator = createStackNavigator({
    Landing,
    Login,
    Register
  })

  const AppNavigator = createBottomTabNavigator(
    {
      Plans: createStackNavigator({
        Plans,
        Plan
      }),
      Create: createStackNavigator({
        Create
      }),
      Notifications: createStackNavigator({
        Notifications
      }),
      Profile: createStackNavigator({
        Profile
      })
    },
    {
      tabBarComponent: TabBar
    }
  )

  const Navigator = createStackNavigator(
    {
      Landing: LandingNavigator,
      App: AppNavigator
    },
    {
      headerMode: 'none',
      initialRouteName: session.token ? 'App' : 'Landing'
    }
  )

  const Container = createAppContainer(Navigator)

  return (
    <KeyboardView style={styles.main}>
      <ApolloProvider client={client()}>
        <Container ref={navigator => nav.set(navigator)} />
      </ApolloProvider>
    </KeyboardView>
  )
}

const styles = StyleSheet.create({
  main: {
    flex: 1
  }
})

export default PlanBear
