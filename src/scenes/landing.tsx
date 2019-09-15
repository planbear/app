import React from 'react'
import {
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View
} from 'react-native'
import { NavigationStackScreenComponent } from 'react-navigation-stack'

import { planbear } from '../assets'
import { Button } from '../components/common'
import { colors, fonts, layout } from '../styles'

const Landing: NavigationStackScreenComponent = ({
  navigation: { navigate }
}) => {
  return (
    <SafeAreaView style={styles.main}>
      <StatusBar barStyle="dark-content" />
      <Image style={styles.planbear} source={planbear} />
      <Text style={styles.description}>Make plans and meet new friends</Text>
      <View style={styles.footer}>
        <Button label="Login" onPress={() => navigate('Login')} />
        <Button
          style={styles.register}
          styleLabel={styles.registerLabel}
          label="Register"
          onPress={() => navigate('Register')}
        />
      </View>
    </SafeAreaView>
  )
}

Landing.navigationOptions = {
  header: () => null
}

const styles = StyleSheet.create({
  main: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    margin: layout.margin * 2
  },
  planbear: {
    height: 180 / 2,
    width: 200 / 2
  },
  description: {
    ...fonts.regular,
    marginTop: layout.margin
  },
  footer: {
    flexDirection: 'row',
    marginTop: layout.margin * 2
  },
  register: {
    backgroundColor: colors.background,
    borderColor: colors.primary,
    borderWidth: layout.border,
    marginLeft: layout.margin
  },
  registerLabel: {
    color: colors.primary
  }
})

export default Landing
