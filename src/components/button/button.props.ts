import React from 'react';
import {
  StyleProp,
  TextStyle,
  TouchableOpacityProps,
  ViewStyle,
} from 'react-native';
import {ButtonPresetNames} from './button.presets';
import {TextPresets} from '../text/text.presets';

export interface ButtonProps extends TouchableOpacityProps {
  text?: string;

  textPreset?: TextPresets;
  textColorScheme?: 'light' | 'dark';
  textColor?: string;

  style?: StyleProp<ViewStyle>;

  textStyle?: StyleProp<TextStyle>;

  preset?: ButtonPresetNames;
  colorScheme?: 'light' | 'dark';

  children?: React.ReactNode;

  loading?: boolean;
}
