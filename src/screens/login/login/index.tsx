import {CompositeScreenProps} from '@react-navigation/native';
import React, {FC} from 'react';
import {TextStyle, View, ViewStyle} from 'react-native';
import {Button, Screen, Text} from '../../../components';
import {signIn} from '../../../config/firebase';
import {
  CENTER,
  color,
  FLEX_ROW,
  PADDING_HORIZONTAL,
  ROOT,
} from '../../../theme';
// import {TEXT_STYLE} from '../register-screen/register-screen';

export const HEADER_TEXT: TextStyle = {
  paddingTop: 75,
  paddingBottom: 35,
  alignSelf: 'center',
};

const BUTTON: ViewStyle = {
  marginTop: 20,
  marginBottom: 35,
  height: 60,
  borderRadius: 70,
};

const DIVIDER: ViewStyle = {
  ...FLEX_ROW,
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

export const LoginScreen: FC<CompositeScreenProps<any, any>> = props => {
  const {navigation} = props;

  //   const initialValues = useMemo(() => {
  //     return {
  //       email: "",
  //       password: "",
  //     };
  //   }, []);

  //   const validationSchema = yup
  //     .object({
  //       email: yup.string().email().required(),
  //       password: yup.string().min(6).required(),
  //     })
  //     .required();

  //   useEffect(() => {
  //     if (access_token) resetRoot(HomeStack);
  //   }, [access_token]);

  //   const handleSubmit = data => {
  //     userStore.signIn(data.email, data.password);
  //   };

  //   const handleNavigate = () => {
  //     navigation.navigate("Login.Register");
  //   };
  const onSignin = () => signIn('kusuma@gmail.com', '123456');
  return (
    <Screen
      preset="scroll"
      style={[ROOT, PADDING_HORIZONTAL]}
      //   colorScheme={colorScheme}
    >
      <Text
        preset="medium1"
        text="Login"
        color={color.blueSecondary}
        style={HEADER_TEXT}
      />
      <Text
        preset="body2"
        text="Hi, welcome back!"
        // colorScheme={colorScheme}
        // style={TEXT_STYLE}
      />
      {/* <Form
        colorScheme={colorScheme}
        initialValues={initialValues}
        validationSchema={validationSchema}
        ModelForm={LoginForm}
        isLoading={loading}
        onSubmit={handleSubmit}
      /> */}
      <View style={DIVIDER}>
        <View style={LINE} />
        <Text preset="body1" text="Login with" />
        <View style={LINE} />
      </View>
      <Button
        preset="outline"
        style={[BUTTON, FLEX_ROW]}
        onPress={onSignin}
        // onPress={userStore.googleSignIn}
      >
        {/* <GoogleLogo style={MARGIN} /> */}
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
          //   onPress={handleNavigate}
        />
      </View>
    </Screen>
  );
};
