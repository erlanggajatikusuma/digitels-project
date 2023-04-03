import React from 'react';
import {StyleProp, ViewStyle} from 'react-native';
import {Edge} from 'react-native-safe-area-context';
import {KeyboardOffsets, ScreenPresets} from './screen.presets';

export interface ScreenProps {
  children?: React.ReactNode;

  style?: StyleProp<ViewStyle>;

  preset?: ScreenPresets;
  colorScheme?: 'light' | 'dark';

  backgroundColor?: string;

  statusBar?: 'light-content' | 'dark-content';

  statusBarTranslucent?: boolean | undefined;

  unsafe?: boolean;

  keyboardOffset?: KeyboardOffsets;

  keyboardShouldPersistTaps?: 'handled' | 'always' | 'never';

  backgroundBar?: string;

  safeAreaEdges?: Edge[];

  scrollViewRef?: any;

  hideOnBlurred?: boolean;
}
