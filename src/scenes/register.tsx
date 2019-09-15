import { useMutation } from '@apollo/react-hooks'
import * as Sentry from '@sentry/react-native'
import gql from 'graphql-tag'
import React, { useRef, useState } from 'react'
import { SafeAreaView, StyleSheet, TextInput } from 'react-native'
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
  const emailRef = useRef<TextInput>()
  const passwordRef = useRef<TextInput>()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [register, { loading }] = useMutation<
    {
      register: AuthResult
    },
    MutationRegisterArgs
  >(LOGIN, {
    async onCompleted({ register }) {
      await session.put(register)

      nav.reset('App')

      const {
        user: { id, email }
      } = register

      Sentry.setUser({
        email,
        id
      })
    }
  })

  const onSubmit = () => {
    if (name && email && password) {
      register({
        variables: {
          name,
          email,
          password
        }
      })
    }
  }

  return (
    <SafeAreaView style={styles.main}>
      <TextBox
        onChangeText={name => setName(name)}
        placeholder="Name"
        onSubmitEditing={() => emailRef.current && emailRef.current.focus()}
        returnKeyType="next"
      />
      <TextBox
        reference={ref => ref && (emailRef.current = ref)}
        style={styles.input}
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
        label="Register"
        loading={loading}
        onPress={onSubmit}
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
