import React, { FunctionComponent, Ref } from 'react'
import {
  Dimensions,
  StyleSheet,
  TextInput,
  TextInputProps,
  View
} from 'react-native'

import { colors, fonts, layout } from '../../styles'

interface Props {
  reference?: Ref<TextInput>
  style?: any
  styleInput?: any
  value?: string
}

const TextBox: FunctionComponent<Props & TextInputProps> = ({
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
        onChangeText={text => onChangeText && onChangeText(text)}
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
