import moment from 'moment'
import React, { FunctionComponent } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'

import { notificationAction } from '../../assets'
import {
  Notification as INotification,
  NotificationAction
} from '../../graphql/types'
import { colors, fonts, layout } from '../../styles'
import { Touchable } from '../common'

interface Props {
  notification: INotification

  navigate: any
}

const Notification: FunctionComponent<Props> = ({
  notification: { action, source, target, updated },
  navigate
}) => {
  const description = () => {
    if (
      action === NotificationAction.NewComment &&
      source.__typename === 'User' &&
      target.__typename === 'Plan'
    ) {
      return `${source.name} commented on your ${target.type} plan.`
    } else if (
      action === NotificationAction.NewRequest &&
      source.__typename === 'User' &&
      target.__typename === 'Plan'
    ) {
      return `${source.name} has requested to join your ${target.type} plan.`
    } else if (
      action === NotificationAction.RequestApproved &&
      source.__typename === 'User' &&
      target.__typename === 'Plan'
    ) {
      return `Your request to join ${source.name}'s ${target.type} plan has been approved.`
    }
  }

  return (
    <Touchable
      style={styles.main}
      onPress={() => {
        if (target.__typename === 'Plan') {
          navigate('Plan', {
            planId: target.id
          })
        }
      }}>
      <Image style={styles.hero} source={notificationAction[action]} />
      <View style={styles.details}>
        <Text style={styles.description}>{description()}</Text>
        <Text style={styles.time}>{moment(updated).fromNow()}</Text>
      </View>
    </Touchable>
  )
}

const styles = StyleSheet.create({
  main: {
    alignItems: 'center',
    flexDirection: 'row',
    padding: layout.margin
  },
  hero: {
    height: layout.heroHeight,
    width: layout.heroHeight
  },
  details: {
    flex: 1,
    marginLeft: layout.margin
  },
  description: {
    ...fonts.regular
  },
  time: {
    ...fonts.small,
    color: colors.textLight,
    marginTop: layout.padding
  }
})

export default Notification
