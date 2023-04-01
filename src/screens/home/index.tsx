import React, {FC} from 'react';
import {Text, ViewStyle} from 'react-native';
import {Screen} from '../../components';

const ROOT: ViewStyle = {
  flexGrow: 1,
  paddingHorizontal: 16,
};

export const HomeScreen: FC = props => {
  return (
    <Screen preset="fixed" safeAreaEdges={['top']} style={ROOT}>
      <Text>Home Screen</Text>
    </Screen>
  );
};
