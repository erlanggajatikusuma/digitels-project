import {TextStyle} from 'react-native';
import {color} from '../../theme';

const BASE: TextStyle = {
  // fontFamily: typography.primary,
  fontSize: 16,
};

export const presetsColors = (colorScheme = 'light') => ({
  color: colorScheme === 'light' ? color.gray800 : color.lightText,
});

export const presets = (colorScheme = 'light') => ({
  default: {...BASE, ...presetsColors(colorScheme)} as TextStyle,

  bold: {
    ...BASE,
    ...presetsColors(colorScheme),
    fontWeight: 'bold',
  } as TextStyle,

  header: {
    ...BASE,
    ...presetsColors(colorScheme),
    fontSize: 24,
    fontWeight: 'bold',
  } as TextStyle,

  fieldLabel: {
    ...BASE,
    ...presetsColors(colorScheme),
    fontWeight: '700',
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0.5,
  } as TextStyle,
  secondary: {
    ...BASE,
    ...presetsColors(colorScheme),
    fontSize: 9,
    color: color.gray600,
  } as TextStyle,

  display1: {
    ...BASE,
    ...presetsColors(colorScheme),
    fontWeight: '900',
    fontSize: 28,
    lineHeight: 36,
    letterSpacing: 1,
  } as TextStyle,
  display2: {
    ...BASE,
    ...presetsColors(colorScheme),
    fontWeight: '900',
    fontSize: 22,
    lineHeight: 28,
    letterSpacing: 1,
  } as TextStyle,
  display3: {
    ...BASE,
    ...presetsColors(colorScheme),
    fontWeight: '900',
    fontSize: 18,
    lineHeight: 24,
    letterSpacing: 0.7,
  } as TextStyle,

  title1: {
    ...BASE,
    ...presetsColors(colorScheme),
    fontWeight: '700',
    fontSize: 20,
    lineHeight: 28,
    letterSpacing: 0.5,
  } as TextStyle,
  title2: {
    ...BASE,
    ...presetsColors(colorScheme),
    fontWeight: '700',
    fontSize: 18,
    lineHeight: 24,
    letterSpacing: 0.5,
  } as TextStyle,
  title3: {
    ...BASE,
    ...presetsColors(colorScheme),
    fontWeight: '700',
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0.5,
  } as TextStyle,
  title4: {
    ...BASE,
    ...presetsColors(colorScheme),
    fontWeight: '700',
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0.5,
  } as TextStyle,
  title5: {
    ...BASE,
    ...presetsColors(colorScheme),
    fontWeight: '700',
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.5,
  } as TextStyle,

  medium1: {
    ...BASE,
    ...presetsColors(colorScheme),
    fontWeight: '500',
    fontSize: 22,
    lineHeight: 26,
    letterSpacing: 0.7,
  } as TextStyle,
  medium2: {
    ...BASE,
    ...presetsColors(colorScheme),
    fontWeight: '500',
    fontSize: 20,
    lineHeight: 24,
    letterSpacing: 0.7,
  } as TextStyle,
  medium3: {
    ...BASE,
    ...presetsColors(colorScheme),
    fontWeight: '500',
    fontSize: 18,
    lineHeight: 20,
    letterSpacing: 0.7,
  } as TextStyle,
  medium4: {
    ...BASE,
    ...presetsColors(colorScheme),
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 18,
    letterSpacing: 0.7,
  } as TextStyle,
  medium5: {
    ...BASE,
    ...presetsColors(colorScheme),
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 16,
    letterSpacing: 0.7,
  } as TextStyle,

  body1: {
    ...BASE,
    ...presetsColors(colorScheme),
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 20,
  } as TextStyle,
  body2: {
    ...BASE,
    ...presetsColors(colorScheme),
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 20,
  } as TextStyle,
  body3: {
    ...BASE,
    ...presetsColors(colorScheme),
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 16,
  } as TextStyle,
  body4: {
    ...BASE,
    ...presetsColors(colorScheme),
    fontWeight: '400',
    fontSize: 10,
    lineHeight: 14,
  } as TextStyle,

  label: {
    ...BASE,
    ...presetsColors(colorScheme),
    fontWeight: '600',
    fontSize: 13,
    lineHeight: 16,
    letterSpacing: 0.7,
    textTransform: 'uppercase',
  } as TextStyle,
  label2: {
    ...BASE,
    ...presetsColors(colorScheme),
    fontWeight: '600',
    fontSize: 11,
    lineHeight: 16,
  } as TextStyle,

  caption1: {
    ...BASE,
    ...presetsColors(colorScheme),
    fontWeight: '700',
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.3,
  } as TextStyle,
  caption2: {
    ...BASE,
    ...presetsColors(colorScheme),
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.3,
  } as TextStyle,
});

export const presetsLight = presets();

export type TextPresets = keyof typeof presetsLight;
