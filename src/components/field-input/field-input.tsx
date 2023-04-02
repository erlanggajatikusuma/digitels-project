import React, {Component, useCallback, useMemo, useState} from 'react';
import {StyleProp, TextStyle, View, ViewProps, ViewStyle} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import {color} from '../../theme';
import {Button} from '../button/button';
import {Input, InputProps} from '../input/input';
import {Text} from '../text/text';
import {TextPresets} from '../text/text.presets';
import {TextProps} from '../text/text.props';

const LABEL_STYLE: TextStyle = {
  paddingVertical: 2,
  textTransform: 'capitalize',
};

export interface FieldInputProps extends ViewProps {
  label?: string;
  labelPreset?: TextPresets;
  labelColor?: string;
  labelStyle?: StyleProp<TextStyle>;
  labelComponent?: Component;

  inputStyle?: StyleProp<TextStyle> | undefined;
  baseInputStyle?: StyleProp<ViewStyle> | undefined;

  errorMessage?: string;
  errorMessagePreset?: TextPresets;
  errorMessageStyle?: StyleProp<TextStyle>;
  errorMessageProps?: TextProps;
  errorMessageComponent?: Component;
  errorLines?: number;

  inputProps?: InputProps;
  children?: JSX.Element | JSX.Element[] | string | any;

  isDisabled?: boolean;
  colorScheme?: 'light' | 'dark';

  validate?: 'default' | 'email' | 'password';
}

const defaultInputProps: InputProps = {};

const Icon = ({colorIcon = color.gray}: {colorIcon?: string}) => {
  return (
    <Svg
      width="18"
      height="12"
      viewBox="0 0 18 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M8.8 0C4.8 0 1.384 2.488 0 6C1.384 9.512 4.8 12 8.8 12C12.8 12 16.216 9.512 17.6 6C16.216 2.488 12.8 0 8.8 0ZM8.8 10C6.592 10 4.8 8.208 4.8 6C4.8 3.792 6.592 2 8.8 2C11.008 2 12.8 3.792 12.8 6C12.8 8.208 11.008 10 8.8 10ZM8.8 3.6C7.472 3.6 6.4 4.672 6.4 6C6.4 7.328 7.472 8.4 8.8 8.4C10.128 8.4 11.2 7.328 11.2 6C11.2 4.672 10.128 3.6 8.8 3.6Z"
        // fill="#232323"
        fill={colorIcon}
      />
    </Svg>
  );
};

export function FieldInput(props: FieldInputProps) {
  const {
    label,
    labelPreset = 'body2',
    labelColor,
    labelStyle,
    labelComponent,
    // inputProps = defaultInputProps,
    isDisabled,
    inputStyle,
    baseInputStyle,
    // errorMessage,
    errorMessagePreset,
    errorMessageStyle,
    errorMessageProps,
    errorMessageComponent,
    colorScheme = 'light',
    errorLines,
    style,
    validate = 'default',
    ...restProps
  } = props;

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isValid, setIsValid] = useState<boolean>(true);
  const [text, onChangeText] = useState<string>('');

  const initialColor = useMemo<string>(() => {
    return color.gray;
  }, []);

  const errorMessage = useMemo(() => {
    let message = '';
    if (validate === 'default') {
      message = 'Input at least 6 characters';
    }
    if (validate === 'email') {
      message = 'Email not valid';
    }
    if (validate === 'password') {
      message =
        'Password min 8 letter, with at least a symbol, upper and lower case letters and a number';
    }

    return message;
  }, [validate]);

  const styles = [style, {paddingVertical: 8}];
  const labelStyles = [labelStyle, LABEL_STYLE];

  const debounce = (fn: Function, delay: number) => {
    let timerId: number;
    return (...args: string[]) => {
      clearTimeout(timerId);
      timerId = setTimeout(() => fn(...args), delay);
    };
  };

  const regexDefault = /^.{6,}$/;
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const regexPassword = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

  const handleChange = (value: string) => {
    if (validate === 'default') {
      setIsValid(regexDefault.test(value));
    }
    if (validate === 'email') {
      setIsValid(regexEmail.test(value));
    }
    if (validate === 'password') {
      setIsValid(regexPassword.test(value));
    }
    onChangeText(value);
  };

  const inputProps = {
    // testID: `${name}-input`,
    // ref: input[name],
    autoCorrect: false,
    // onSubmitEditing: () => {},
    value: text,
    onChangeText: handleChange,
    ...defaultInputProps,
  };

  return (
    <View {...restProps} style={styles}>
      {(labelComponent || label) && (
        <>
          {labelComponent || (
            <Text
              text={label}
              preset={labelPreset || 'title4'}
              colorScheme={colorScheme}
              color={labelColor}
              style={labelStyles}
            />
          )}
        </>
      )}
      {(props.children &&
        ((typeof props.children === 'function' && props.children(inputProps)) ||
          props.children)) || (
        <Input
          colorScheme={colorScheme}
          baseStyle={baseInputStyle}
          style={inputStyle}
          inputLeftElement={inputProps.inputLeftElement || <></>}
          inputRightElement={
            inputProps.inputRightElement ||
            (inputProps.type === 'password' && (
              <Button
                preset="link"
                colorScheme={colorScheme}
                testID={`${inputProps.testID || ''}-show-password`}
                onPress={() => setShowPassword(!showPassword)}>
                <Icon colorIcon={showPassword ? color.primary : initialColor} />
              </Button>
            )) || <></>
          }
          {...inputProps}
          type={
            inputProps.type === 'password' && showPassword
              ? 'text'
              : inputProps.type
          }
          isDisabled={isDisabled}
        />
      )}
      {!isValid && errorMessage && (
        <>
          {errorMessageComponent || (
            <Text
              text={errorMessage}
              preset={errorMessagePreset || 'caption2'}
              colorScheme={colorScheme}
              numberOfLines={errorLines}
              {...errorMessageProps}
              style={errorMessageStyle}
            />
          )}
        </>
      )}
    </View>
  );
}
