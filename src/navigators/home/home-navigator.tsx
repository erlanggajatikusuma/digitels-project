import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {ProductScreen} from '../../screens';

export type HomeNavigatorParamList = {
  'Home.Home': undefined;
  'Home.Product': undefined;
};

const Stack = createNativeStackNavigator<HomeNavigatorParamList>();

export const HomeStack = {
  index: 0,
  routes: [
    {
      name: 'Home.Stack',
      state: {index: 0, routes: [{name: 'Home.Home'}]},
    },
  ],
};

export const HomeNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home.Product"
        options={{headerShown: false}}
        component={ProductScreen}
      />
    </Stack.Navigator>
  );
};
