import React from 'react'
import { FlatList } from 'react-native'
import { NavigationStackScreenComponent } from 'react-navigation-stack'

import { NavBar, Separator, Touchable } from '../components/common'
import { Plan } from '../components/plans'
import { Plan as IPlan } from '../graphql/types'

interface Props {
  plans: IPlan[]
  title: string
}

const Plans: NavigationStackScreenComponent<Props> = ({
  navigation: { navigate, getParam }
}) => {
  const plans = getParam('plans')

  return (
    <FlatList
      data={plans}
      ItemSeparatorComponent={Separator}
      renderItem={({ item }) => (
        <Touchable
          onPress={() =>
            navigate('Plan', {
              planId: item.id
            })
          }>
          <Plan plan={item} />
        </Touchable>
      )}
    />
  )
}

Plans.navigationOptions = ({ navigation: { getParam } }) => ({
  header: () => <NavBar back title={getParam('title', 'Plans')} />
})

export default Plans
