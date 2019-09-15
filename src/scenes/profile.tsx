import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import React from 'react'
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native'
import { NavigationStackScreenComponent } from 'react-navigation-stack'

import { img_rating } from '../assets'
import { Avatar, Button, NavBar, Spinner } from '../components/common'
import { User } from '../graphql/types'
import { nav, session } from '../lib'
import { colors, fonts, layout, shadow } from '../styles'
import { client } from '..'

export const GET_PROFILE = gql`
  query profile {
    profile {
      id
      email
      name
      push
      rating
      created
    }
  }
`

const Profile: NavigationStackScreenComponent = ({
  navigation: { getParam, setParams }
}) => {
  const { data } = useQuery<{ profile: User }>(GET_PROFILE, {
    onCompleted({ profile: { id } }) {
      if (!getParam('id')) {
        setParams({
          id
        })
      }
    }
  })

  if (!data || !data.profile) {
    return <Spinner />
  }

  const {
    profile: { email, name, rating }
  } = data

  return (
    <>
      <ScrollView contentContainerStyle={styles.main}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.email}>{email}</Text>
        <View style={styles.rating}>
          <Image style={styles.icon} source={img_rating} />
          <Text style={styles.ratingLabel}>{rating}</Text>
        </View>
      </ScrollView>
      <Button
        style={styles.logout}
        color="red"
        ghost
        label="Logout"
        onPress={async () => {
          await client.resetStore()
          await client.cache.reset()
          await session.clear()

          nav.reset('Landing')
        }}
      />
    </>
  )
}

Profile.navigationOptions = ({ navigation: { getParam } }) => ({
  header: () =>
    getParam('id') ? (
      <SafeAreaView style={styles.safe}>
        <Avatar style={styles.avatar} id={getParam('id')} />
      </SafeAreaView>
    ) : (
      <NavBar title="Profile" />
    )
})

const styles = StyleSheet.create({
  safe: {
    ...shadow,
    alignItems: 'center',
    backgroundColor: colors.primary
  },
  avatar: {
    height: layout.avatarHeight * 3,
    marginVertical: layout.margin * 2,
    width: layout.avatarHeight * 3
  },
  main: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    padding: layout.margin
  },
  name: {
    ...fonts.subtitle,
    marginTop: layout.margin
  },
  email: {
    ...fonts.small,
    color: colors.textLight,
    marginTop: layout.padding
  },
  rating: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: layout.margin
  },
  icon: {
    height: layout.iconHeight,
    width: layout.iconHeight
  },
  ratingLabel: {
    ...fonts.small,
    marginLeft: layout.padding
  },
  logout: {
    borderWidth: 0,
    margin: layout.margin
  }
})

export default Profile
