import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { orderBy } from 'lodash'
import React from 'react'
import { FlatList, Image, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-navigation'
import { NavigationStackScreenComponent } from 'react-navigation-stack'

import { img_arrow_down, img_close } from '../assets'
import {
  Button,
  Modal,
  NavBar,
  Separator,
  Spinner,
  Touchable
} from '../components/common'
import { Plan } from '../components/plans'
import { Plan as IPlan, QueryPlansArgs } from '../graphql/types'
import { colors, fonts, layout, shadow, weights } from '../styles'

interface Props {
  radius: number
  visible: boolean
}

export const GET_PLANS = gql`
  query plans($radius: Int!) {
    plans(radius: $radius) {
      id
      description
      expires
      meta {
        comments
        distance
        going
        max
      }
      status
      time
      type
      user {
        id
        name
      }
      created
      updated
    }
  }
`

const Plans: NavigationStackScreenComponent<Props> = ({
  navigation: { navigate, getParam, setParams }
}) => {
  const radius = getParam('radius', 20)
  const visible = getParam('visible', false)

  const { data, loading, refetch } = useQuery<
    {
      plans: IPlan[]
    },
    QueryPlansArgs
  >(GET_PLANS, {
    variables: {
      radius
    }
  })

  if (!data || !data.plans) {
    return <Spinner />
  }

  return (
    <>
      <FlatList
        contentContainerStyle={styles.content}
        data={orderBy(data.plans, ['expires', 'distance'], ['asc', 'asc'])}
        ItemSeparatorComponent={Separator}
        ListEmptyComponent={() => (
          <View style={styles.empty}>
            <Text style={styles.label}>
              There are no plans nearby. Why don't you create one?
            </Text>
            <Button label="Create a plan" onPress={() => navigate('Create')} />
          </View>
        )}
        onRefresh={refetch}
        refreshing={loading}
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
      <Modal
        style={modal.modal}
        onRequestClose={() =>
          setParams({
            visible: false
          })
        }
        visible={visible}>
        <View style={modal.header}>
          <Text style={modal.title}>How far should we look for plans?</Text>
          <Touchable
            style={modal.close}
            onPress={() =>
              setParams({
                visible: false
              })
            }>
            <Image style={modal.icon} source={img_close} />
          </Touchable>
        </View>
        <FlatList
          data={[10, 20, 50, 100]}
          ItemSeparatorComponent={Separator}
          keyExtractor={item => String(item)}
          renderItem={({ item }) => (
            <Touchable
              onPress={() =>
                setParams({
                  radius: item,
                  visible: false
                })
              }>
              <Text style={modal.label}>{item}km</Text>
            </Touchable>
          )}
        />
      </Modal>
    </>
  )
}

Plans.navigationOptions = ({ navigation: { getParam, setParams } }) => ({
  header: () => {
    const radius = getParam('radius', 20)

    return (
      <SafeAreaView
        style={header.safe}
        forceInset={{
          top: 'always'
        }}>
        <View style={header.main}>
          <Text style={header.title}>Plans within {radius}km</Text>
          <Touchable
            style={header.touchable}
            onPress={() =>
              setParams({
                visible: true
              })
            }>
            <Image style={header.icon} source={img_arrow_down} />
          </Touchable>
        </View>
      </SafeAreaView>
    )
  }
})

const styles = StyleSheet.create({
  content: {
    flexGrow: 1
  },
  empty: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    padding: layout.margin * 2
  },
  label: {
    ...fonts.regular,
    marginBottom: layout.margin,
    textAlign: 'center'
  }
})

const header = StyleSheet.create({
  safe: {
    ...shadow,
    alignItems: 'center',
    backgroundColor: colors.primary
  },
  main: {
    alignItems: 'center',
    flexDirection: 'row',
    height: layout.navBarHeight,
    justifyContent: 'center'
  },
  title: {
    ...fonts.regular,
    color: colors.background
  },
  touchable: {
    marginLeft: layout.padding
  },
  icon: {
    height: layout.iconHeight,
    width: layout.iconHeight
  }
})

const modal = StyleSheet.create({
  modal: {
    width: '80%'
  },
  header: {
    alignItems: 'center',
    backgroundColor: colors.backgroundDark,
    flexDirection: 'row'
  },
  title: {
    ...fonts.regular,
    ...weights.semibold,
    flex: 1,
    padding: layout.margin
  },
  close: {
    padding: layout.margin
  },
  icon: {
    height: layout.iconHeight,
    width: layout.iconHeight
  },
  label: {
    ...fonts.regular,
    padding: layout.margin
  }
})

export default Plans
