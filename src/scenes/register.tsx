import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import React, { useState } from 'react'
import { SafeAreaView, StyleSheet } from 'react-native'
import { NavigationStackScreenComponent } from 'react-navigation-stack'

import { Button, NavBar, TextBox } from '../components/common'
import { AuthResult, MutationRegisterArgs } from '../graphql/types'
import { nav, session } from '../lib'
import { layout } from '../styles'

export const LOGIN = gql`
  mutation register($name: String!, $email: String!, $password: String!) {
    register(name: $name, email: $email, password: $password) {
      token
      user {
        id
        email
        name
      }
    }
  }
`

const Register: NavigationStackScreenComponent = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [register, { loading }] = useMutation<
    { register: AuthResult },
    MutationRegisterArgs
  >(LOGIN, {
    async update(proxy, { data }) {
      if (data) {
        const { register } = data

        await session.put(register)

        nav.reset('App')
      }
    }
  })

  return (
    <SafeAreaView style={styles.main}>
      <TextBox placeholder="Name" onChangeText={name => setName(name)} />
      <TextBox
        style={styles.input}
        autoCapitalize="none"
        keyboardType="email-address"
        onChangeText={email => setEmail(email)}
        placeholder="Email"
      />
      <TextBox
        style={styles.input}
        onChangeText={password => setPassword(password)}
        placeholder="Password"
        secureTextEntry
      />
      <Button
        style={styles.input}
        label="Register"
        loading={loading}
        onPress={() => {
          if (name && email && password) {
            register({
              variables: {
                name,
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

Register.navigationOptions = {
  header: () => <NavBar back title="Register" />
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

export default Register
