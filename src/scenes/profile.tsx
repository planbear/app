import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import React from 'react'
import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View
} from 'react-native'
import { NavigationStackScreenComponent } from 'react-navigation-stack'

import { img_rating } from '../assets'
import { Avatar, Button, Spinner } from '../components/common'
import { User } from '../graphql/types'
import { nav, session } from '../lib'
import { colors, fonts, layout } from '../styles'
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

const Profile: NavigationStackScreenComponent = () => {
  const { data } = useQuery<{ profile: User }>(GET_PROFILE)

  if (!data || !data.profile) {
    return <Spinner />
  }

  const {
    profile: { email, id, name, rating }
  } = data

  return (
    <>
      <SafeAreaView style={styles.safe}>
        <Avatar style={styles.avatar} id={id} />
      </SafeAreaView>
      <ScrollView contentContainerStyle={styles.main}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.email}>{email}</Text>
        <View style={styles.rating}>
          <Image style={styles.icon} source={img_rating} />
          <Text style={styles.ratingLabel}>{rating}</Text>
        </View>
        <Button
          color="red"
          ghost
          label="Logout"
          onPress={async () => {
            await client.resetStore()
            await session.clear()

            nav.reset('Landing')
          }}
          style={styles.logout}
        />
      </ScrollView>
    </>
  )
}

Profile.navigationOptions = {
  header: null
}

const styles = StyleSheet.create({
  safe: {
    alignItems: 'center',
    backgroundColor: colors.primary
  },
  avatar: {
    borderRadius: layout.avatarHeight * 1.5,
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
    marginTop: layout.margin * 3
  }
})

export default Profile
