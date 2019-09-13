import React, { FunctionComponent } from 'react'
import {
  Modal,
  ModalProps,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle
} from 'react-native'

import { colors, layout } from '../../styles'

interface Props {
  style?: StyleProp<ViewStyle>
}

const ModalView: FunctionComponent<Props & ModalProps> = ({
  visible,
  children,
  onRequestClose,
  style
}) => {
  return (
    <Modal
      animationType="fade"
      onRequestClose={onRequestClose}
      transparent
      visible={visible}>
      <View style={styles.modal}>
        <View style={[styles.main, style]}>{children}</View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modal: {
    alignItems: 'center',
    backgroundColor: colors.modal,
    flex: 1,
    justifyContent: 'center'
  },
  main: {
    backgroundColor: colors.background,
    borderRadius: layout.radius,
    maxHeight: '80%',
    maxWidth: '80%',
    overflow: 'hidden'
  }
})

export default ModalView
