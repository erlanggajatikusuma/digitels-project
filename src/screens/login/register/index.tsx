import {yupResolver} from '@hookform/resolvers/yup';
import {CompositeScreenProps} from '@react-navigation/native';
import React, {FC, useEffect, useMemo, useRef, useState} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {ActivityIndicator, TextInput, TextStyle, ViewStyle} from 'react-native';
import * as yup from 'yup';
import {
  Button,
  FieldInput,
  Screen,
  Text,
  Toast as Modal,
} from '../../../components';
import {register} from '../../../config/firebase';
import * as storage from '../../../utils/storage';

import {color, PADDING_HORIZONTAL, ROOT} from '../../../theme';
import {AppStack} from '../../../app';
import {resetRoot} from '../../../navigators';

export const TEXT_STYLE: TextStyle = {
  marginBottom: 15,
};

const LOADING: ViewStyle = {
  width: 72,
  height: 72,
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 48,
  backgroundColor: 'rgba(255, 255, 255, 0.75)',
};

const BUTTON: ViewStyle = {
  marginTop: 40,
  marginBottom: 35,
  height: 60,
  borderRadius: 70,
};

const HEADER_TEXT: TextStyle = {
  paddingTop: 55,
  paddingBottom: 35,
  alignSelf: 'center',
};

export const RegisterScreen: FC<CompositeScreenProps<any, any>> = props => {
  const [isError, setIsError] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isShow, setIsShow] = useState<boolean>(false);

  const input = {
    name: useRef<TextInput>(),
    email: useRef<TextInput>(),
    password: useRef<TextInput>(),
  };
  const nextInput = {
    name: () => input.email.current?.focus(),
    email: () => input.password.current?.focus(),
    password: () => true,
  };

  const initialValues = useMemo(() => {
    return {
      name: '',
      email: '',
      password: '',
    };
  }, []);
  const validationSchema = yup
    .object({
      name: yup.string().min(3).required(),
      email: yup.string().email().required(),
      password: yup.string().min(6).required(),
    })
    .required();

  const methods = useForm({
    defaultValues: initialValues,
    mode: 'onChange',
    resolver: yupResolver(validationSchema),
  });

  const {
    formState: {isDirty, isValid},
    handleSubmit,
    control,
  } = methods;

  useEffect(() => {
    setIsError(!(isDirty && isValid));
  }, [isDirty, isValid]);

  const onSubmit = ({email, password}) => {
    setIsLoading(true);
    register(email, password)
      .then(res => {
        setIsShow(true);
        storage.save('user', res.user);
        setIsLoading(false);
        resetRoot(AppStack);
      })
      .catch(err => {
        console.log('err', err);
        setIsShow(true);
      });
  };

  return (
    <Screen preset="scroll" style={[ROOT, PADDING_HORIZONTAL]}>
      <Text
        preset="medium1"
        text="Register"
        color={color.blueSecondary}
        style={HEADER_TEXT}
      />
      <Text
        preset="body2"
        text="Let's create your account!"
        style={TEXT_STYLE}
      />
      <FormProvider {...methods}>
        <FieldInput
          control={control}
          input={input}
          nextInput={nextInput}
          formControlProps={{
            inputProps: {
              autoCapitalize: 'none',
              autoComplete: 'off',
              autoCorrect: false,
              textContentType: 'username',
            },
          }}
          name="name"
        />
        <FieldInput
          control={control}
          input={input}
          nextInput={nextInput}
          formControlProps={{
            inputProps: {
              autoCapitalize: 'none',
              autoComplete: 'email',
              autoCorrect: false,
              textContentType: 'emailAddress',
              keyboardType: 'email-address',
            },
          }}
          name="email"
        />
        <FieldInput
          control={control}
          input={input}
          nextInput={nextInput}
          formControlProps={{
            inputProps: {
              type: 'password',
              autoCapitalize: 'none',
              autoComplete: 'password',
              autoCorrect: false,
              textContentType: 'password',
              onSubmitEditing: handleSubmit(onSubmit),
            },
          }}
          name="password"
        />
        <Button
          testID="save-button"
          text="Register"
          disabled={isError}
          loading={isLoading}
          onPress={handleSubmit(data => onSubmit(data))}
          style={BUTTON}
        />
      </FormProvider>
      <Modal visible={isLoading} style={LOADING}>
        <ActivityIndicator size="large" />
      </Modal>
      <Modal
        visible={isShow}
        onCancel={() => setIsShow(false)}
        onBackdropPress={() => setIsShow(false)}
      />
    </Screen>
  );
};
