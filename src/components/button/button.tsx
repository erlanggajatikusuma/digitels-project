import * as React from 'react';
import {TouchableOpacity} from 'react-native';
import {Text} from '../text/text';
import {textPresets, viewPresets} from './button.presets';
import {ButtonProps} from './button.props';

export function Button(props: ButtonProps) {
  // grab the props
  const {
    preset = 'primary',
    colorScheme = 'light',
    text,
    textPreset = 'medium4',
    textColorScheme = colorScheme || 'light',
    textColor,
    style: styleOverride,
    textStyle: textStyleOverride,
    children,
    disabled,
    loading,
    ...rest
  } = props;

  const viewStyle =
    viewPresets(colorScheme)[preset] || viewPresets(colorScheme).primary;
  const viewStyles = [
    viewStyle,
    disabled && preset !== 'link' && viewPresets(colorScheme).disabled,
    loading && preset !== 'link' && viewPresets(colorScheme).loading,
    styleOverride,
  ];
  const textStyle =
    textPresets(colorScheme)[preset] || textPresets(colorScheme).primary;
  const textStyles = [
    textStyle,
    textStyleOverride,
    loading && preset === 'link' && textPresets(colorScheme).linkLoading,
  ];

  const content = children || (
    <Text
      text={text}
      preset={textPreset || 'title3'}
      colorScheme={textColorScheme}
      color={textColor}
      style={textStyles}
    />
  );
  return (
    <TouchableOpacity
      style={viewStyles}
      disabled={disabled || loading}
      {...rest}>
      {content}
    </TouchableOpacity>
  );
}
