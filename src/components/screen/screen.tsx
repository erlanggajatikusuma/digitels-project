import {useIsFocused} from '@react-navigation/native';
import * as React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {color} from '../../theme';
import {isNonScrolling, offsets, presets} from './screen.presets';
import {ScreenProps} from './screen.props';

const isIos = Platform.OS === 'ios';

function ScreenWithoutScrolling(props: ScreenProps) {
  const {safeAreaEdges = ['bottom', 'top']} = props;
  const preset = presets().fixed;
  const style = props.style || {};
  const backgroundStyle = props.backgroundColor
    ? {backgroundColor: props.backgroundColor}
    : {};
  const statusBarStyle = props.statusBar || 'dark-content';
  const statusBarBackgroundColor = props.backgroundBar || color.white;

  return (
    <KeyboardAvoidingView
      style={[preset.outer, backgroundStyle]}
      behavior={isIos ? 'padding' : undefined}
      keyboardVerticalOffset={offsets[props.keyboardOffset || 'none']}>
      <StatusBar
        barStyle={statusBarStyle}
        backgroundColor={statusBarBackgroundColor}
      />
      <SafeAreaView
        edges={props.unsafe ? ['left', 'right'] : safeAreaEdges}
        style={[preset.outer, backgroundStyle]}>
        <View style={[preset.inner, style]}>{props.children}</View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

function ScreenWithScrolling(props: ScreenProps) {
  // const {safeAreaEdges = ['bottom', 'top']} = props;
  const {safeAreaEdges = ['bottom']} = props;
  const preset = presets().scroll;
  const style = props.style || {};
  const backgroundStyle = props.backgroundColor
    ? {backgroundColor: props.backgroundColor}
    : {};
  const statusBarStyle = props.statusBar || 'dark-content';
  const statusBarBackgroundColor = props.backgroundBar || color.white;

  return (
    <KeyboardAvoidingView
      style={[preset.outer, backgroundStyle]}
      behavior={isIos ? 'padding' : undefined}
      keyboardVerticalOffset={offsets[props.keyboardOffset || 'none']}>
      <StatusBar
        barStyle={statusBarStyle}
        backgroundColor={statusBarBackgroundColor}
      />
      <ScrollView
        ref={props.scrollViewRef}
        contentInsetAdjustmentBehavior="automatic"
        style={[preset.outer, backgroundStyle]}
        // style={[backgroundStyle]}
        contentContainerStyle={[preset.inner, style]}
        keyboardShouldPersistTaps={props.keyboardShouldPersistTaps || 'handled'}
        showsVerticalScrollIndicator={false}>
        <SafeAreaView
          edges={props.unsafe ? ['left', 'right'] : safeAreaEdges}
          style={[preset.inner, backgroundStyle]}>
          {props.children}
        </SafeAreaView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

export function Screen(props: ScreenProps) {
  const {hideOnBlurred = true} = props;
  const isFocused = useIsFocused();
  if (hideOnBlurred && !isFocused) {
    return null;
  }
  if (isNonScrolling(props.preset)) {
    return <ScreenWithoutScrolling {...props} />;
  } else {
    return <ScreenWithScrolling {...props} />;
  }
}
