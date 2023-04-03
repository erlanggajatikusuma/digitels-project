import React, {FC, useCallback} from 'react';
import {
  Controller,
  RegisterOptions,
  UseControllerReturn,
} from 'react-hook-form';
import {View} from 'react-native';
import {InputProps} from '../../input/input';
import {Field, FieldProps} from '../field';

export interface FieldInputProps extends InputProps {
  name: string;
  control: any;
  rules?: Omit<
    RegisterOptions,
    'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
  >;
  input?: any;
  nextInput?: any;
  formControlProps?: FieldProps;
}

export interface InputFormControlProps {
  name?: string;
  rules?: any;
}

const defaultInput: any = {};
const defaultNextInput: any = {};
const defaultFormControlProps: any = {};

const InputFormControl: FC<FieldInputProps & InputFormControlProps> = props => {
  const {
    // colorScheme = Appearance.getColorScheme() || 'light',
    name: fieldName,
    control,
    rules,
    input = defaultInput,
    nextInput = defaultNextInput,
    formControlProps: {
      inputProps,
      ...formControlProps
    } = defaultFormControlProps,
  } = props;

  const renderField = useCallback(
    (props: UseControllerReturn) => {
      const {
        field: {onChange, value, name},
        formState: {errors},
      } = props;

      const formControlInputProps = {
        testID: `${name}-input`,
        ref: input[name],
        autoCapitalize: 'none',
        autoComplete: 'off',
        autoCorrect: false,
        textContentType: 'none',
        returnKeyType: nextInput[name] ? 'next' : 'go',
        onSubmitEditing: () =>
          nextInput[name] ? nextInput[name]() : undefined,
        value: value,
        onChangeText: onChange,
        ...inputProps,
      };

      return (
        <Field
          label={fieldName}
          inputProps={formControlInputProps}
          {...formControlProps}
          errorMessage={errors && errors[name]?.message}
        />
      );
    },
    [fieldName, formControlProps, input, inputProps, nextInput],
  );
  return (
    <Controller
      control={control}
      name={fieldName}
      rules={rules}
      render={renderField}
    />
  );
};

export const FieldInput = (props: FieldInputProps) => {
  const {colorScheme = 'light'} = props;
  return (
    <View>
      <InputFormControl colorScheme={colorScheme} {...props} />
    </View>
  );
};
