import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {CameraScreen} from '../../screens';

export type ProfileNavigatorParamList = {
  'Profile.Profile': undefined;
  'Profile.Camera': undefined;
};

const Stack = createNativeStackNavigator<ProfileNavigatorParamList>();

export const ProfileStack = {
  index: 0,
  routes: [
    {
      name: 'Profile.Stack',
      state: {index: 0, routes: [{name: 'Profile.Profile'}]},
    },
  ],
};

export const ProfileNavigator = () => {
  const insets = useSafeAreaInsets();

  return (
    <Stack.Navigator
    // initialRouteName="Profile.Profile"
    >
      <Stack.Screen
        name="Profile.Camera"
        component={CameraScreen}
        options={{
          title: '',
          headerShown: false,
          headerBackTitleVisible: false,
          //   statusBarStyle: 'dark',
          animationTypeForReplace: 'push',
        }}
      />
    </Stack.Navigator>
  );
};
