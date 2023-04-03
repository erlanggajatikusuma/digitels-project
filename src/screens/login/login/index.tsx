import {yupResolver} from '@hookform/resolvers/yup';
import {CompositeScreenProps} from '@react-navigation/native';
import React, {FC, useEffect, useMemo, useRef, useState} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {
  ActivityIndicator,
  TextInput,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import * as yup from 'yup';
import {GoogleLogo} from '../../../assets';
import {
  Button,
  FieldInput,
  Screen,
  Text,
  Toast as Modal,
} from '../../../components';
import {signIn} from '../../../config/firebase';
import {navigate} from '../../../navigators';
import {
  CENTER,
  color,
  FLEX_ROW,
  FLEX_ROW_BETWEEN,
  PADDING_HORIZONTAL,
  ROOT,
} from '../../../theme';

export const HEADER_TEXT: TextStyle = {
  paddingTop: 75,
  paddingBottom: 35,
  alignSelf: 'center',
};

const BUTTON: ViewStyle = {
  marginTop: 20,
  // marginBottom: 35,
  height: 60,
  borderRadius: 70,
};

const DIVIDER: ViewStyle = {
  ...FLEX_ROW_BETWEEN,
  marginTop: 20,
};

const LINE: ViewStyle = {
  width: 100,
  borderColor: color.baseGray,
  borderBottomWidth: 1,
};

const MARGIN: ViewStyle = {
  marginRight: 18,
};

const LOADING: ViewStyle = {
  width: 72,
  height: 72,
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 48,
  backgroundColor: 'rgba(255, 255, 255, 0.75)',
};

export const LoginScreen: FC<CompositeScreenProps<any, any>> = props => {
  // const {navigation} = props;

  const [isError, setIsError] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const input = {
    email: useRef<TextInput>(),
    password: useRef<TextInput>(),
  };

  const nextInput = {
    email: () => input.password.current?.focus(),
    password: () => true,
  };

  const initialValues = useMemo(() => {
    return {
      email: '',
      password: '',
    };
  }, []);

  const validationSchema = yup
    .object({
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

  const handleNavigate = () => navigate('Login.Stack', 'Login.Register');
  const onSubmit = ({email, password}) => {
    console.log('EMAIL ===> ', email);
    console.log('PASSWORD ===> ', password);
    // signIn(email, password);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  };

  console.log('LOADING ===> ', isLoading);
  return (
    <Screen preset="scroll" style={[ROOT, PADDING_HORIZONTAL]}>
      <Text
        preset="medium1"
        text="Login"
        color={color.blueSecondary}
        style={HEADER_TEXT}
      />
      <Text preset="body2" text="Hi, welcome back!" />
      <FormProvider {...methods}>
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
          text="Login"
          disabled={isError}
          loading={isLoading}
          onPress={handleSubmit(data => onSubmit(data))}
          style={BUTTON}
        />
      </FormProvider>
      <View style={DIVIDER}>
        <View style={LINE} />
        <Text preset="body1" text="Login with" />
        <View style={LINE} />
      </View>
      <Button
        preset="outline"
        style={[BUTTON, FLEX_ROW, {marginBottom: 35}]}
        // onPress={onSignin}
      >
        <GoogleLogo style={MARGIN} />
        <Text preset="medium4" text="Google" color={color.blueSecondary} />
      </Button>
      <View style={[FLEX_ROW, CENTER]}>
        <Text
          preset="body2"
          text="Don't have an account? "
          color={color.blackBase}
        />
        <Button
          text="Sign Up"
          preset="link"
          textPreset="medium5"
          textColor={color.blueSecondary}
          onPress={handleNavigate}
        />
      </View>
      <Modal visible={isLoading} style={LOADING}>
        <ActivityIndicator size="large" />
      </Modal>
    </Screen>
  );
};
