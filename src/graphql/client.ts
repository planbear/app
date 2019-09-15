import {
  InMemoryCache,
  IntrospectionFragmentMatcher
} from 'apollo-cache-inmemory'
import { ApolloClient } from 'apollo-client'
import { ApolloLink } from 'apollo-link'
import { setContext } from 'apollo-link-context'
import { onError } from 'apollo-link-error'
import { HttpLink } from 'apollo-link-http'
import { get } from 'lodash'
import { Alert } from 'react-native'
import { API_URI } from 'react-native-dotenv'

import { geo, nav, session } from '../lib'
import schema from './schema.json'

export default () => {
  const cache = new InMemoryCache({
    fragmentMatcher: new IntrospectionFragmentMatcher({
      introspectionQueryResultData: schema
    })
  })

  const link = ApolloLink.from([
    onError(({ graphQLErrors }) => {
      if (graphQLErrors) {
        const code = get(graphQLErrors, '0.extensions.code')

        if (code === 'UNAUTHENTICATED') {
          session.clear().then(() => nav.reset('Landing'))

          return
        }

        Alert.alert(
          'Error',
          get(graphQLErrors, '0.message', 'Something went wrong')
        )
      }
    }),
    setContext(async (request, { headers }) => {
      if (!headers) {
        headers = {}
      }

      if (session.token) {
        headers.authorization = `Bearer ${session.token}`
      }

      const { latitude, longitude } = await geo.location()

      headers.location = `${latitude},${longitude}`

      return {
        headers
      }
    }),
    new HttpLink({
      uri: API_URI
    })
  ])

  return new ApolloClient({
    cache,
    link
  })
}
