import React, {FC} from 'react';
import {Text, ViewStyle} from 'react-native';
import {Screen} from '../../components';

const ROOT: ViewStyle = {
  paddingHorizontal: 16,
};

export const ProfileScreen: FC = props => {
  return (
    <Screen preset="scroll" style={ROOT}>
      <Text>Profile Screen</Text>
    </Screen>
  );
};
