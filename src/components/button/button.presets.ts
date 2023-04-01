import {ViewStyle, TextStyle} from 'react-native';
import {color, spacing} from '../../theme';

const BASE_VIEW: ViewStyle = {
  paddingVertical: spacing[2],
  paddingHorizontal: spacing[2],
  borderRadius: 4,
  justifyContent: 'center',
  alignItems: 'center',
};

const BASE_TEXT: TextStyle = {
  paddingHorizontal: spacing[3],
};

export const viewPresets = (colorScheme = 'light') => ({
  primary: {
    ...BASE_VIEW,
    backgroundColor:
      colorScheme === 'light' ? color.blueSecondary : color.light50,
  } as ViewStyle,

  danger: {
    ...BASE_VIEW,
    backgroundColor: colorScheme === 'light' ? color.red700 : color.red300,
  } as ViewStyle,

  outline: {
    ...BASE_VIEW,
    paddingVertical: spacing[2] - 1,
    paddingHorizontal: spacing[2] - 1,
    borderWidth: 1,
    borderColor: colorScheme === 'light' ? color.primary : color.lightText,
  } as ViewStyle,

  disabled: {...BASE_VIEW, backgroundColor: color.gray500} as ViewStyle,

  loading: {
    ...BASE_VIEW,
    backgroundColor: colorScheme === 'light' ? color.blue300 : color.blue700,
  } as ViewStyle,

  link: {
    ...BASE_VIEW,
    paddingHorizontal: 0,
    paddingVertical: 0,
    alignItems: 'flex-start',
  } as ViewStyle,
});

export const viewPresetsLight = viewPresets();

export const textPresets = (colorScheme = 'light') => ({
  primary: {
    ...BASE_TEXT,
    color: colorScheme === 'light' ? color.lightText : color.darkText,
  } as TextStyle,
  danger: {
    ...BASE_TEXT,
    color: colorScheme === 'light' ? color.darkText : color.lightText,
  } as TextStyle,
  outline: {
    ...BASE_TEXT,
    color: colorScheme === 'light' ? color.blueSecondary : color.lightText,
  } as TextStyle,
  link: {
    ...BASE_TEXT,
    color: colorScheme === 'light' ? color.primary : color.lightText,
    paddingHorizontal: 0,
    paddingVertical: 0,
  } as TextStyle,
  linkLoading: {...BASE_TEXT, color: color.gray500},
});

export type ButtonPresetNames = keyof typeof viewPresetsLight;
