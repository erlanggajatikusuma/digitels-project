import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {HomeNavigator, ProfileNavigator} from './navigators';
// import {HomeNavigator} from './home/home-navigator';
// import {LoginNavigator} from './login/login-navigator';
import {navigationRef} from './navigators/navigation-utilities';
import {HomeScreen, MapScreen, ProfileScreen} from './screens';
import {color} from './theme';

export type NavigatorParamList = {
  'App.Stack': undefined;
  'Login.Stack': undefined;
  'Home.Stack': undefined;
  'Profile.Stack': undefined;
};

export type AppNavigatorParamList = {
  'Home.Home': undefined;
  'Map.Map': undefined;
  'Profile.Profile': undefined;
};

interface NavigationProps
  extends Partial<React.ComponentProps<typeof NavigationContainer>> {}

const Stack = createNativeStackNavigator<NavigatorParamList>();
const BottomTab = createBottomTabNavigator<AppNavigatorParamList>();

export const AppStack = {
  index: 0,
  routes: [{name: 'App.Stack'}],
};

const AppNavigator_ = () => {
  return (
    <BottomTab.Navigator
      initialRouteName="Home.Home"
      screenOptions={{
        headerShown: false,
        tabBarLabelPosition: 'below-icon',
        tabBarStyle: {borderTopColor: color.light100},
      }}>
      <BottomTab.Screen name="Home.Home" component={HomeScreen} />
      <BottomTab.Screen name="Map.Map" component={MapScreen} />
      <BottomTab.Screen name="Profile.Profile" component={ProfileScreen} />
    </BottomTab.Navigator>
  );
};

const App = (props: NavigationProps) => {
  return (
    <NavigationContainer ref={navigationRef} theme={DefaultTheme} {...props}>
      <Stack.Navigator
        screenOptions={{
          headerBackTitleVisible: false,
          headerTitleAlign: 'left',
        }}
        initialRouteName="App.Stack">
        <Stack.Screen name="App.Stack" options={{headerShown: false}}>
          {AppNavigator_}
        </Stack.Screen>
        <Stack.Screen
          name="Home.Stack"
          options={{
            title: '',
            headerBackTitleVisible: false,
            headerTintColor: color.black,
            headerShadowVisible: false,
          }}>
          {HomeNavigator}
        </Stack.Screen>
        <Stack.Screen name="Profile.Stack">{ProfileNavigator}</Stack.Screen>

        {/* <Stack.Screen name="Login.Stack">{LoginNavigator}</Stack.Screen> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
