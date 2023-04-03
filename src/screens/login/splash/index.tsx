import {CompositeScreenProps} from '@react-navigation/native';
import React, {FC, useCallback, useEffect} from 'react';
import {View, ViewStyle} from 'react-native';
import {SplashLogo} from '../../../assets';
import {Screen} from '../../../components';
import {HomeStack, LoginStack, resetRoot} from '../../../navigators';
import {color, ROOT} from '../../../theme';
import * as storage from '../../../utils/storage';

const CENTER: ViewStyle = {
  alignItems: 'center',
  justifyContent: 'center',
  flex: 1,
  backgroundColor: color.primary,
};

export const SplashScreen: FC<CompositeScreenProps<any, any>> = props => {
  const navigateTo = useCallback(async () => {
    const user = await storage.load('user').then(res => res);
    if (user) {
      resetRoot(HomeStack);
    } else {
      resetRoot(LoginStack);
    }
  }, []);

  useEffect(() => {
    navigateTo().catch();
  }, [navigateTo]);

  return (
    <Screen
      style={ROOT}
      preset="fixed"
      colorScheme="light"
      backgroundColor={color.primary}
      backgroundBar={color.primary}
      statusBar="light-content">
      <View style={CENTER}>
        <SplashLogo />
      </View>
    </Screen>
  );
};
