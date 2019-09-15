import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { orderBy } from 'lodash'
import React from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import { NavigationStackScreenComponent } from 'react-navigation-stack'

import { NavBar, Separator, Spinner } from '../components/common'
import { Notification } from '../components/notifications'
import { Notification as INotification } from '../graphql/types'
import { fonts, layout } from '../styles'

export const GET_NOTIFICATIONS = gql`
  query notifications {
    notifications {
      id
      created
      action
      source {
        ... on Plan {
          id
          type
        }
        ... on User {
          id
          name
        }
      }
      target {
        ... on Plan {
          id
          type
        }
        ... on User {
          id
          name
        }
      }
      updated
    }
  }
`

const Notifications: NavigationStackScreenComponent = ({
  navigation: { navigate }
}) => {
  const { data, loading, refetch } = useQuery<{
    notifications: INotification[]
  }>(GET_NOTIFICATIONS)

  if (!data || !data.notifications) {
    return <Spinner />
  }

  return (
    <FlatList
      contentContainerStyle={styles.content}
      data={orderBy(data.notifications, ['updated'], ['desc'])}
      ItemSeparatorComponent={Separator}
      ListEmptyComponent={() => (
        <View style={styles.empty}>
          <Text style={styles.label}>
            You don't have any notifications yet.
          </Text>
        </View>
      )}
      onRefresh={refetch}
      refreshing={loading}
      renderItem={({ item }) => (
        <Notification notification={item} navigate={navigate} />
      )}
    />
  )
}

Notifications.navigationOptions = {
  header: () => <NavBar title="Notifications" />
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
    textAlign: 'center'
  }
})

export default Notifications
