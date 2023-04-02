import {TextStyle} from 'react-native';
import {presets as textPresets, presetsColors} from '../text/text.presets';

const BASE: TextStyle = {
  ...textPresets().body2,
  color: undefined,
  height: 40,
  lineHeight: 17,
  paddingVertical: 8,
};

export const presets = (colorScheme = 'light') => ({
  default: {...BASE, ...presetsColors(colorScheme)},
});

export const presetsLight = presets();

export type InputPresets = keyof typeof presetsLight;
