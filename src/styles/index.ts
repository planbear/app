import { iOSColors, iOSUIKit } from 'react-native-typography'

export const colors = {
  primary: '#59596e',
  primaryDark: '#312b3c',
  accent: '#d0af80',

  background: iOSColors.white,
  backgroundDark: iOSColors.customGray,

  border: iOSColors.lightGray,
  modal: 'rgba(0, 0, 0, 0.5)',

  text: iOSColors.black,
  textLight: iOSColors.gray
}

export const fonts = {
  regular: {
    ...iOSUIKit.bodyObject
  },
  small: {
    ...iOSUIKit.footnoteObject
  },
  subtitle: {
    ...iOSUIKit.title3EmphasizedObject
  },
  title: {
    ...iOSUIKit.largeTitleEmphasizedObject
  }
}

export const layout = {
  margin: 20,
  padding: 10,

  radius: 5,
  border: 2,

  avatarHeight: 100,
  backHeight: 20,
  buttonHeight: 50,
  iconHeight: 20,
  navBarHeight: 50,
  tabBarHeight: 50,
  textBoxHeight: 50
}

export const shadow = {
  elevation: 5,
  shadowColor: iOSColors.black,
  shadowOffset: {
    height: 0,
    width: 0
  },
  shadowOpacity: 0.1,
  shadowRadius: 5
}
