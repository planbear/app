import React, { FunctionComponent } from 'react'
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  StatusBar
} from 'react-native'
import { NavigationScreenProps, withNavigation } from 'react-navigation'

import { img_back } from '../../assets'
import { colors, fonts, layout } from '../../styles'
import Touchable from './touchable'

interface Props {
  back?: boolean
  title: string
}

const NavBar: FunctionComponent<Props & NavigationScreenProps> = ({
  back,
  title,
  navigation: { goBack }
}) => {
  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" />
      <View style={styles.main}>
        {back && (
          <Touchable
            style={[styles.action, styles.left]}
            onPress={() => goBack(null)}>
            <Image style={styles.icon} source={img_back} />
          </Touchable>
        )}
        <Text style={styles.title}>{title}</Text>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safe: {
    backgroundColor: colors.primary
  },
  main: {
    alignItems: 'center',
    height: layout.navBarHeight,
    justifyContent: 'center'
  },
  action: {
    alignItems: 'center',
    bottom: 0,
    height: layout.navBarHeight,
    justifyContent: 'center',
    position: 'absolute',
    width: layout.navBarHeight
  },
  left: {
    left: 0
  },
  icon: {
    height: layout.backHeight,
    width: layout.backHeight
  },
  title: {
    ...fonts.regular,
    color: colors.background
  }
})

export default withNavigation(NavBar)
