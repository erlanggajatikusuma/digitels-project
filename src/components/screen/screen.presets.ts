import {ViewStyle} from 'react-native';
import {color} from '../../theme';

export const offsets = {
  none: 0,
};

export type KeyboardOffsets = keyof typeof offsets;

export const presets = () => ({
  fixed: {
    outer: {
      backgroundColor: color.white,
      flex: 1,
    } as ViewStyle,
    inner: {
      justifyContent: 'flex-start',
      alignItems: 'stretch',
      width: '100%',
    } as ViewStyle,
  },

  scroll: {
    outer: {
      flex: 1,
      backgroundColor: color.white,
    } as ViewStyle,
    inner: {
      flexGrow: 1,
      justifyContent: 'flex-start',
      alignItems: 'stretch',
    } as ViewStyle,
  },
});

export const presetsLight = presets();

export type ScreenPresets = keyof typeof presetsLight;

export function isNonScrolling(preset?: ScreenPresets) {
  // any of these things will make you scroll
  return !preset || !presets()[preset] || preset === 'fixed';
}
