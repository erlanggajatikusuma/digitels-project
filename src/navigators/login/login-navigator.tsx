import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {LoginScreen, RegisterScreen, SplashScreen} from '../../screens';
import {color} from '../../theme';

export type LoginNavigatorParamList = {
  'Login.Splash': undefined;
  'Login.Login': undefined;
  'Login.Register': undefined;
};

const Stack = createNativeStackNavigator<LoginNavigatorParamList>();

export const LoginStack = {
  index: 0,
  routes: [
    {name: 'Login.Stack', state: {index: 0, routes: [{name: 'Login.Login'}]}},
  ],
};

export const LoginStackSplash = {
  index: 0,
  routes: [
    {name: 'Login.Stack', state: {index: 0, routes: [{name: 'Login.Splash'}]}},
  ],
};

export const LoginNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Login.Splash">
      <Stack.Screen
        name="Login.Splash"
        component={SplashScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Login.Login"
        component={LoginScreen}
        options={{
          title: 'Login',
          headerShown: false,
          headerStyle: {backgroundColor: color.primary},
          headerTintColor: color.white,
          // headerStyle: {backgroundColor: color.primary, shadowColor: 'black'},
        }}
      />
      <Stack.Screen
        name="Login.Register"
        component={RegisterScreen}
        options={{
          title: '',
          headerTintColor: color.primary,
          headerShadowVisible: false,
        }}
      />
    </Stack.Navigator>
  );
};
