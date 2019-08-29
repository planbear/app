import { NavigationActions, StackActions } from 'react-navigation'

class Nav {
  navigator: any

  set(navigator: any) {
    this.navigator = navigator
  }

  reset(routeName: string) {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({
          routeName
        })
      ]
    })

    this.navigator.dispatch(resetAction)
  }
}

export default new Nav()
