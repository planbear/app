import React, { FunctionComponent } from 'react'
import { Dimensions, StyleSheet, TextInput, View } from 'react-native'

import { colors, fonts, layout } from '../../styles'

interface Props {
  autoCapitalize?: any
  autoCorrect?: boolean
  keyboardType?: any
  multiline?: boolean
  numberOfLines?: number
  placeholder?: string
  reference?: any
  returnKeyType?: any
  secureTextEntry?: boolean
  style?: any
  styleInput?: any
  value?: string

  onChangeText: (value: string) => void
  onSubmitEditing?: () => void
}

const TextBox: FunctionComponent<Props> = ({
  autoCapitalize,
  autoCorrect,
  keyboardType,
  multiline,
  numberOfLines = 5,
  onChangeText,
  onSubmitEditing,
  placeholder,
  reference,
  returnKeyType,
  secureTextEntry,
  style,
  styleInput,
  value
}) => {
  const { height } = Dimensions.get('window')

  const maxHeight = height / 4
  const potentialHeight = layout.textBoxHeight * numberOfLines

  return (
    <View style={[styles.main, multiline && styles.multiline, style]}>
      <TextInput
        ref={reference}
        style={[
          styles.input,
          multiline && {
            height: potentialHeight > maxHeight ? maxHeight : potentialHeight
          },
          styleInput
        ]}
        autoCapitalize={autoCapitalize}
        autoCorrect={autoCorrect}
        keyboardType={keyboardType}
        multiline={multiline}
        numberOfLines={numberOfLines}
        onChangeText={value => onChangeText(value)}
        onSubmitEditing={onSubmitEditing}
        placeholder={placeholder}
        placeholderTextColor={colors.textLight}
        returnKeyType={returnKeyType}
        secureTextEntry={secureTextEntry}
        textAlignVertical={multiline ? 'top' : 'center'}
        underlineColorAndroid="transparent"
        value={value}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  main: {
    backgroundColor: colors.background,
    borderColor: colors.border,
    borderRadius: layout.radius,
    borderWidth: layout.border
  },
  multiline: {
    paddingVertical: layout.padding
  },
  input: {
    ...fonts.regular,
    height: layout.textBoxHeight,
    paddingHorizontal: layout.margin * (3 / 4)
  }
})

export default TextBox
