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

import { nav, session } from '../lib'
import schema from './schema.json'

export default () => {
  const cache = new InMemoryCache({
    fragmentMatcher: new IntrospectionFragmentMatcher({
      introspectionQueryResultData: schema
    })
  })

  const headers = () => {
    const headers: any = {}

    if (session.token) {
      headers.authorization = `Bearer ${session.token}`
    }

    return headers
  }

  const link = ApolloLink.from([
    onError(({ graphQLErrors }) => {
      console.log('graphQLErrors', graphQLErrors)

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
    setContext((request, { headers }) => {
      if (!headers) {
        headers = {}
      }

      if (session.token) {
        headers.authorization = `Bearer ${session.token}`
      }

      return {
        headers
      }
    }),
    new HttpLink({
      uri: API_URI,
      headers: headers()
    })
  ])

  return new ApolloClient({
    cache,
    link
  })
}
