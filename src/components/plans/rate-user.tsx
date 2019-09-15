import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { range } from 'lodash'
import React, { FunctionComponent, useState } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'

import { img_close, img_rating, img_rating_gray } from '../../assets'
import { Member, MutationRateUserArgs, Plan } from '../../graphql/types'
import { colors, fonts, layout, weights } from '../../styles'
import { Button, Modal, Touchable } from '../common'

interface Props {
  member: Member
  plan: Plan
  visible: boolean

  onClose: () => void
}

export const RATE_USER = gql`
  mutation rateUser($planId: ID!, $userId: ID!, $rating: Int!) {
    rateUser(planId: $planId, userId: $userId, rating: $rating) {
      success
    }
  }
`

const RateUser: FunctionComponent<Props> = ({
  member: { id: userId, name },
  plan: { id: planId, type },
  visible,
  onClose
}) => {
  const [rating, setRating] = useState(5)

  const [rate] = useMutation<any, MutationRateUserArgs>(RATE_USER, {
    variables: {
      planId,
      rating,
      userId
    },
    onCompleted() {
      onClose()
    }
  })

  return (
    <Modal style={styles.main} onRequestClose={onClose} visible={visible}>
      <View style={styles.header}>
        <Text style={styles.title}>
          Rate {name} for your {type.replace(/_/g, ' ')} plan
        </Text>
        <Touchable style={styles.close} onPress={onClose}>
          <Image style={styles.icon} source={img_close} />
        </Touchable>
      </View>
      <View style={styles.content}>
        {range(1, 6).map(index => (
          <Touchable key={index} onPress={() => setRating(index)}>
            <Image
              style={styles.star}
              source={rating >= index ? img_rating : img_rating_gray}
            />
          </Touchable>
        ))}
      </View>
      <Button style={styles.submit} label="Submit" onPress={rate} />
    </Modal>
  )
}

const styles = StyleSheet.create({
  main: {
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
  content: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: layout.margin
  },
  star: {
    height: layout.iconHeight * 1.5,
    margin: layout.padding,
    width: layout.iconHeight * 1.5
  },
  submit: {
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0
  }
})

export default RateUser
