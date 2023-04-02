import * as React from 'react';
import {
  StyleProp,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import {color, FLEX_ROW} from '../../theme';
import {presets} from './input.presets';

const CONTAINER: ViewStyle = {
  borderBottomWidth: 1,
  ...FLEX_ROW,
};

const BASE_INPUT: TextStyle = {
  flex: 1,
};

export interface InputProps extends Omit<TextInputProps, 'textAlign'> {
  ref?: any;
  colorScheme?: 'light' | 'dark';
  baseStyle?: StyleProp<ViewStyle> | undefined;
  inputLeftElement?: JSX.Element | JSX.Element[];
  inputRightElement?: JSX.Element | JSX.Element[];

  isDisabled?: boolean;

  type?: 'text' | 'password' | string;
}

export const Input = React.forwardRef<TextInput, InputProps>(
  (props: InputProps, ref: any) => {
    const {
      colorScheme = 'light',
      style: styleOverride,
      baseStyle: baseStyleOverride,
      multiline,
      numberOfLines,
      inputLeftElement = <></>,
      inputRightElement = <></>,
      type,
      placeholderTextColor,
      ...rest
    } = props;

    const [borderColor, setBorderColor] = React.useState<string>(
      color.light100,
    );

    const placeholderColor = placeholderTextColor
      ? placeholderTextColor
      : color.gray400;
    const style = [presets(colorScheme).default, BASE_INPUT];
    const styles = [
      style,
      styleOverride,
      (multiline && {height: '81px'}) || {},
    ];
    const baseStyle = [
      CONTAINER,
      baseStyleOverride,
      baseStyleOverride ? baseStyleOverride : {borderColor: borderColor},
    ];

    return (
      <View style={baseStyle}>
        {inputLeftElement && inputLeftElement}
        <TextInput
          ref={ref}
          style={styles}
          multiline={multiline}
          numberOfLines={numberOfLines}
          textAlignVertical={(multiline && 'top') || undefined}
          onFocus={() => setBorderColor(color.primary)}
          onBlur={() => setBorderColor(color.light100)}
          secureTextEntry={type === 'password'}
          placeholderTextColor={placeholderColor}
          autoCapitalize="none"
          {...rest}
        />
        {inputRightElement && inputRightElement}
      </View>
    );
  },
);
