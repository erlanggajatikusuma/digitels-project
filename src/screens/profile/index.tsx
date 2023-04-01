import React, {FC} from 'react';
import {Text, ViewStyle} from 'react-native';
import {Button, Screen} from '../../components';
import {navigate} from '../../navigators';

const ROOT: ViewStyle = {
  paddingHorizontal: 16,
};

export const ProfileScreen: FC = props => {
  const onNavigate = () => navigate('Profile.Stack', 'Profile.Camera');
  return (
    <Screen preset="scroll" style={ROOT}>
      <Text>Profile Screen</Text>
      <Button text="camera" onPress={onNavigate} />
    </Screen>
  );
};
