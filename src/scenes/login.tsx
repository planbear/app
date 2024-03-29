import { useMutation } from '@apollo/react-hooks'
import * as Sentry from '@sentry/react-native'
import gql from 'graphql-tag'
import React, { useRef, useState } from 'react'
import { StyleSheet, TextInput } from 'react-native'
import { SafeAreaView } from 'react-navigation'
import { NavigationStackScreenComponent } from 'react-navigation-stack'

import { Button, NavBar, TextBox } from '../components/common'
import { AuthResult, MutationLoginArgs } from '../graphql/types'
import { nav, session } from '../lib'
import { layout } from '../styles'

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        email
        name
      }
    }
  }
`

const Login: NavigationStackScreenComponent = () => {
  const passwordRef = useRef<TextInput>()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [login, { loading }] = useMutation<
    {
      login: AuthResult
    },
    MutationLoginArgs
  >(LOGIN, {
    async onCompleted({ login }) {
      await session.put(login)

      nav.reset('App')

      const {
        user: { id, email }
      } = login

      Sentry.setUser({
        email,
        id
      })
    }
  })

  const onSubmit = () => {
    if (email && password) {
      login({
        variables: {
          email,
          password
        }
      })
    }
  }

  return (
    <SafeAreaView
      style={styles.main}
      forceInset={{
        bottom: 'always',
        top: 'never'
      }}>
      <TextBox
        autoCapitalize="none"
        keyboardType="email-address"
        onChangeText={email => setEmail(email)}
        onSubmitEditing={() =>
          passwordRef.current && passwordRef.current.focus()
        }
        placeholder="Email"
        returnKeyType="next"
      />
      <TextBox
        reference={ref => ref && (passwordRef.current = ref)}
        style={styles.input}
        onChangeText={password => setPassword(password)}
        onSubmitEditing={onSubmit}
        placeholder="Password"
        returnKeyType="done"
        secureTextEntry
      />
      <Button
        style={styles.input}
        label="Login"
        loading={loading}
        onPress={onSubmit}
      />
    </SafeAreaView>
  )
}

Login.navigationOptions = {
  header: () => <NavBar back title="Login" />
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'flex-end',
    margin: layout.margin
  },
  input: {
    marginTop: layout.margin
  }
})

export default Login
