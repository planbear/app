import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import React, { useState } from 'react'
import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { NavigationScreenComponent } from 'react-navigation'

import { planbear } from '../assets'
import { Button, NavBar, TextBox } from '../components/common'
import { AuthResult, MutationLoginArgs } from '../graphql/types'
import { colors, fonts, layout } from '../styles'
import { session, nav } from '../lib'

export interface LoginData {
  login: AuthResult
}

export const LOGIN = gql`
  mutation signIn($email: String!, $password: String!) {
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

const Login: NavigationScreenComponent = ({ navigation: { navigate } }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [login, { loading }] = useMutation<LoginData, MutationLoginArgs>(
    LOGIN,
    {
      async update(cache, result) {
        const { data } = result

        if (data) {
          const { login } = data

          await session.put(login)

          nav.reset('App')
        }
      }
    }
  )

  return (
    <SafeAreaView style={styles.main}>
      <TextBox
        autoCapitalize="none"
        placeholder="Email"
        onChangeText={email => setEmail(email)}
      />
      <TextBox
        style={styles.input}
        onChangeText={password => setPassword(password)}
        placeholder="Password"
        secureTextEntry
      />
      <Button
        style={styles.input}
        label="Login"
        loading={loading}
        onPress={() => {
          if (email && password) {
            login({
              variables: {
                email,
                password
              }
            })
          }
        }}
      />
    </SafeAreaView>
  )
}

Login.navigationOptions = {
  header: <NavBar back title="Login" />
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
