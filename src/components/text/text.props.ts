import {StyleProp, TextStyle, TextProps as TextProperties} from 'react-native';
import {TextPresets} from './text.presets';

export interface TextProps extends TextProperties {
  children?: React.ReactNode;

  text?: string;

  style?: StyleProp<TextStyle>;

  preset?: TextPresets;

  colorScheme?: 'light' | 'dark';

  color?: string;

  transformText?: (text: string) => string;
}
