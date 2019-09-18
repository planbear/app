import { useMutation, useQuery } from '@apollo/react-hooks'
import * as Sentry from '@sentry/react-native'
import gql from 'graphql-tag'
import { difference } from 'lodash'
import React, { useState } from 'react'
import {
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  View
} from 'react-native'
import ImagePicker from 'react-native-image-picker'
import { SafeAreaView } from 'react-navigation'
import { NavigationStackScreenComponent } from 'react-navigation-stack'

import { img_arrow_right, img_rating } from '../assets'
import {
  Avatar,
  Button,
  NavBar,
  Separator,
  Spinner,
  Touchable
} from '../components/common'
import { MutationUpdateProfileArgs, User } from '../graphql/types'
import { nav, session } from '../lib'
import { colors, fonts, layout, shadow } from '../styles'
import { client } from '..'

interface Props {
  photo?: string
  profile: User
}

export const GET_PROFILE = gql`
  query profile {
    profile {
      id
      email
      name
      push
      rating
      created
      plans {
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
  }
`

export const UPDATE_PROFILE = gql`
  mutation updateProfile($name: String, $push: Boolean) {
    updateProfile(name: $name, push: $push) {
      push
    }
  }
`

const Profile: NavigationStackScreenComponent<Props> = ({
  navigation: { getParam, navigate, setParams }
}) => {
  const [notifications, setNotifications] = useState<boolean>(true)

  const { data, loading, refetch } = useQuery<{
    profile: User
  }>(GET_PROFILE, {
    onCompleted({ profile }) {
      const { push } = profile

      setNotifications(push)

      if (!getParam('profile')) {
        setParams({
          profile
        })
      }
    }
  })

  const [update] = useMutation<
    {
      updateProfile: User
    },
    MutationUpdateProfileArgs
  >(UPDATE_PROFILE)

  if (!data || !data.profile) {
    return <Spinner />
  }

  const {
    profile: { plans }
  } = data

  const userPlans = plans.filter(plan => plan.user.id === session.userId)
  const participatedPlans = difference(plans, userPlans)

  return (
    <>
      <ScrollView
        contentContainerStyle={styles.main}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={refetch} />
        }>
        <View style={styles.row}>
          <Text style={styles.label}>Push notifications</Text>
          <Switch
            style={styles.action}
            value={notifications}
            onValueChange={push => {
              setNotifications(push)

              update({
                variables: {
                  push
                }
              })
            }}
          />
        </View>
        <Separator />
        {userPlans.length > 0 && (
          <Touchable
            style={styles.row}
            onPress={() =>
              navigate('UserPlans', {
                plans: userPlans,
                title: 'Plans you created'
              })
            }>
            <Text style={styles.label}>
              Plans you created ({userPlans.length})
            </Text>
            <Image
              style={[styles.action, styles.icon]}
              source={img_arrow_right}
            />
          </Touchable>
        )}
        {participatedPlans.length > 0 && (
          <Touchable
            style={styles.row}
            onPress={() =>
              navigate('UserPlans', {
                plans: participatedPlans,
                title: 'Plans you joined'
              })
            }>
            <Text style={styles.label}>
              Plans you joined ({participatedPlans.length})
            </Text>
            <Image
              style={[styles.action, styles.icon]}
              source={img_arrow_right}
            />
          </Touchable>
        )}
      </ScrollView>
      <Button
        style={styles.logout}
        color="red"
        ghost
        label="Logout"
        onPress={async () => {
          await client.clearStore()
          await client.cache.reset()
          await session.clear()

          nav.reset('Landing')

          Sentry.setUser(null)
        }}
      />
    </>
  )
}

Profile.navigationOptions = ({ navigation: { getParam, setParams } }) => ({
  header: () => {
    const photo = getParam('photo')
    const user = getParam('profile')

    if (user) {
      const { email, id, name, rating } = user

      return (
        <SafeAreaView
          style={styles.safe}
          forceInset={{
            bottom: 'never',
            top: 'always'
          }}>
          <Touchable
            onPress={() => {
              ImagePicker.showImagePicker(
                {
                  noData: true,
                  title: 'Select profile photo'
                },
                ({ uri }) => {
                  if (uri) {
                    setParams({
                      photo: uri
                    })
                  }
                }
              )
            }}>
            {!!photo && (
              <Image
                style={styles.avatar}
                source={{
                  uri: photo
                }}
              />
            )}
            {!photo && <Avatar style={styles.avatar} id={id} />}
          </Touchable>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.email}>{email}</Text>
          <View style={styles.rating}>
            <Image style={styles.icon} source={img_rating} />
            <Text style={styles.ratingLabel}>{rating}</Text>
          </View>
        </SafeAreaView>
      )
    }

    return <NavBar title="Profile" />
  }
})

const styles = StyleSheet.create({
  safe: {
    ...shadow,
    alignItems: 'center',
    backgroundColor: colors.primary
  },
  avatar: {
    borderRadius: layout.radius,
    height: layout.avatarHeight * 3,
    marginTop: layout.margin * 2,
    width: layout.avatarHeight * 3
  },
  name: {
    ...fonts.subtitle,
    color: colors.background,
    marginTop: layout.margin
  },
  email: {
    ...fonts.small,
    color: colors.background,
    marginTop: layout.padding
  },
  rating: {
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: layout.margin
  },
  icon: {
    height: layout.iconHeight,
    width: layout.iconHeight
  },
  ratingLabel: {
    ...fonts.small,
    color: colors.background,
    marginLeft: layout.padding
  },
  main: {
    flex: 1
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    padding: layout.margin
  },
  label: {
    ...fonts.small,
    flex: 1
  },
  action: {
    marginLeft: layout.padding
  },
  logout: {
    borderWidth: 0,
    margin: layout.margin
  }
})

export default Profile
