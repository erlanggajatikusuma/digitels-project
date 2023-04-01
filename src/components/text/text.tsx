import * as React from 'react';
import {presets} from './text.presets';
import {TextProps} from './text.props';
import {StyleProp, Text as ReactNativeText, TextStyle} from 'react-native';

export function Text(props: TextProps) {
  const {
    preset = 'default',
    colorScheme = 'light',
    // tx, txOptions,
    text,
    children,
    style: styleOverride,
    color,
    transformText = text => text,
    ...rest
  } = props;

  const content = transformText(text) || children;

  const style = presets(colorScheme)[preset] || presets(colorScheme).default;
  const styles: StyleProp<TextStyle> = [
    style,
    styleOverride,
    color ? ({color: color} as TextStyle) : {},
  ];

  return (
    <ReactNativeText style={styles} {...rest}>
      {content}
    </ReactNativeText>
  );
}
