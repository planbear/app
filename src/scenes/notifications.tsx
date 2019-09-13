import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { orderBy } from 'lodash'
import React from 'react'
import { FlatList } from 'react-native'
import { NavigationStackScreenComponent } from 'react-navigation-stack'

import { NavBar, Separator, Spinner } from '../components/common'
import { Notification } from '../components/notifications'
import { Notification as INotification } from '../graphql/types'

export interface GetNotificationsData {
  notifications: INotification[]
}

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
  const { data, loading, refetch } = useQuery<GetNotificationsData>(
    GET_NOTIFICATIONS
  )

  if (!data || !data.notifications) {
    return <Spinner />
  }

  return (
    <FlatList
      data={orderBy(data.notifications, ['updated'], ['desc'])}
      ItemSeparatorComponent={Separator}
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

export default Notifications
