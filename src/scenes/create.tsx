import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { startCase } from 'lodash'
import pluralize from 'pluralize'
import React, { useEffect, useState } from 'react'
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import { NavigationStackScreenComponent } from 'react-navigation-stack'

import { img_minus, img_plus } from '../assets'
import {
  Button,
  DateTimePicker,
  LocationPicker,
  NavBar,
  TextBox,
  Touchable
} from '../components/common'
import Picker, { LabelValue } from '../components/common/picker'
import {
  LocationInput,
  MutationCreatePlanArgs,
  Plan,
  PlanType
} from '../graphql/types'
import { colors, fonts, layout } from '../styles'

export const CREATE_PLAN = gql`
  mutation createPlan($plan: PlanInput!) {
    createPlan(plan: $plan) {
      id
      comments {
        id
        body
        created
        pinned
        user {
          id
          name
        }
      }
      description
      expires
      meta {
        comments
        distance
        going
        max
      }
      members {
        approved
        id
        owner
        joined
        name
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

const Create: NavigationStackScreenComponent = ({
  navigation: { navigate }
}) => {
  const [description, setDescription] = useState('')
  const [expires, setExpires] = useState()
  const [location, setLocation] = useState<LocationInput>()
  const [max, setMax] = useState(0)
  const [time, setTime] = useState()
  const [type, setType] = useState<LabelValue>()

  const [createPlan, { loading }] = useMutation<
    { createPlan: Plan },
    MutationCreatePlanArgs
  >(CREATE_PLAN, {
    onCompleted({ createPlan: { id } }) {
      navigate('Plan', {
        planId: id
      })

      setDescription('')
      setExpires(undefined)
      setLocation(undefined)
      setMax(0)
      setTime(undefined)
      setType(undefined)
    }
  })

  useEffect(() => {
    setExpires(undefined)
  }, [time])

  const planTypes = Object.values(PlanType).map(value => ({
    value,
    label: startCase(value)
  }))

  return (
    <>
      <ScrollView contentContainerStyle={styles.main}>
        <Text style={styles.label}>What kind of plan is this?</Text>
        <Picker
          data={planTypes}
          onChange={type => setType(type)}
          placeholder="Plan type"
          selected={type}
        />
        <TextBox
          style={styles.input}
          placeholder="What is your plan about? Tell us more."
          onChangeText={description => setDescription(description)}
          multiline
          numberOfLines={2}
          value={description}
        />
        <Text style={[styles.label, styles.input]}>
          Where are you planning to go? This will help other people find your
          plan close to their location.
        </Text>
        <LocationPicker onLocationChange={location => setLocation(location)} />
        <Text style={[styles.label, styles.input]}>
          Do you want to limit how many people can join your plan?
        </Text>
        <View style={styles.max}>
          <Touchable
            style={styles.maxButton}
            onPress={() => {
              if (max > 0) {
                setMax(max - 1)
              }
            }}>
            <Image style={styles.maxIcon} source={img_minus} />
          </Touchable>
          <Text style={styles.maxLabel}>
            {max === 0
              ? 'No participant limit'
              : `${max} ${pluralize('person', max)} max`}
          </Text>
          <Touchable
            style={styles.maxButton}
            onPress={() => {
              setMax(max + 1)
            }}>
            <Image style={styles.maxIcon} source={img_plus} />
          </Touchable>
        </View>
        <Text style={[styles.label, styles.input]}>
          When does your event start?
        </Text>
        <DateTimePicker
          placeholder="Start"
          onChange={time => setTime(time)}
          value={time}
        />
        {time && (
          <>
            <Text style={[styles.label, styles.input]}>
              Do you want to prevent people from joining the plan after a
              certain time? Eg, if you need time to organize. This is optional.
            </Text>
            <DateTimePicker
              max={time}
              onChange={expires => setExpires(expires)}
              placeholder="Expiry"
              value={expires}
            />
          </>
        )}
      </ScrollView>
      {type && !!description && location && time && (
        <View style={styles.footer}>
          <Button
            label="Create plan"
            loading={loading}
            onPress={() =>
              createPlan({
                variables: {
                  plan: {
                    description,
                    expires,
                    location,
                    max,
                    time,
                    type: type.value as PlanType
                  }
                }
              })
            }
          />
        </View>
      )}
    </>
  )
}

Create.navigationOptions = {
  header: () => <NavBar title="Create your plan" />
}

const styles = StyleSheet.create({
  main: {
    padding: layout.margin
  },
  label: {
    ...fonts.small,
    color: colors.textLight,
    marginBottom: layout.padding
  },
  max: {
    borderColor: colors.border,
    borderRadius: layout.radius,
    borderWidth: layout.border,
    flexDirection: 'row'
  },
  maxButton: {
    alignItems: 'center',
    height: layout.buttonHeight,
    justifyContent: 'center',
    width: layout.buttonHeight
  },
  maxIcon: {
    height: layout.iconHeight,
    width: layout.iconHeight
  },
  maxLabel: {
    ...fonts.regular,
    alignSelf: 'center',
    flex: 1,
    textAlign: 'center'
  },
  input: {
    marginTop: layout.margin
  },
  footer: {
    borderTopColor: colors.border,
    borderTopWidth: layout.border,
    padding: layout.margin
  }
})

export default Create
