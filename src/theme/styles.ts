import {Platform, ViewStyle} from 'react-native';
import StaticSafeAreaInsets from 'react-native-static-safe-area-insets';

export const ROOT: ViewStyle = {
  flexGrow: 1,
};

export const FLEX: ViewStyle = {
  flex: 1,
};

export const FLEX_ROW_BETWEEN: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
};

export const FLEX_ROW: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'center',
};

export const CENTER: ViewStyle = {
  alignItems: 'center',
  justifyContent: 'center',
};

export const PADDING_HORIZONTAL: ViewStyle = {
  paddingHorizontal: 27,
};

export const CONTENT_CONTAINER: ViewStyle = {
  marginTop: 20,
  marginBottom: 68,
};

export const CONTENT_SPACING = 15;

const SAFE_BOTTOM =
  Platform.select({
    ios: StaticSafeAreaInsets.safeAreaInsetsBottom,
  }) ?? 0;

export const SAFE_AREA_PADDING = {
  paddingLeft: StaticSafeAreaInsets.safeAreaInsetsLeft + CONTENT_SPACING,
  paddingTop: StaticSafeAreaInsets.safeAreaInsetsTop + CONTENT_SPACING,
  paddingRight: StaticSafeAreaInsets.safeAreaInsetsRight + CONTENT_SPACING,
  paddingBottom: SAFE_BOTTOM + CONTENT_SPACING,
};

// Capture Button
export const CAPTURE_BUTTON_SIZE = 78;
