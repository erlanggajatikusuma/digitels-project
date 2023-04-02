import React, {FC} from 'react';
import {
  Appearance,
  Dimensions,
  GestureResponderEvent,
  Modal as ModalReact,
  ModalProps,
  NativeSyntheticEvent,
  Pressable,
  StyleProp,
  View,
  ViewStyle,
} from 'react-native';
import {color} from '../../theme';
import {Button} from '../button/button';
import {Text} from '../text/text';

const width = Dimensions.get('window').width;

const CENTERED: ViewStyle = {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  position: 'relative',
  backgroundColor: 'rgba(0,0,0, 0.5)',
};

export const MODAL_VIEW: ViewStyle = {
  backgroundColor: color.white,
  width: width - 25,
  height: '30%',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 8,
  padding: 16,
  paddingVertical: 10,
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 4,
  elevation: 5,
};

const BUTTON_LOGOUT_CONTAINER: ViewStyle = {
  flexDirection: 'row',
  justifyContent: 'space-between',
  width: '100%',
  padding: 12,
};

const BUTTON_LOGOUT_MODAL: ViewStyle = {
  width: '48%',
  borderRadius: 5,
  paddingVertical: 10,
};

const BUTTON_BACK_MODAL: ViewStyle = {
  ...BUTTON_LOGOUT_MODAL,
  paddingVertical: 9,
};

interface ModalReactProps extends ModalProps {
  colorScheme?: 'light' | 'dark';
  title?: string;
  subtitle?: string;
  children?: React.ReactNode;
  onRequestClose?: (event: NativeSyntheticEvent<any>) => void | undefined;
  onBackdropPress?: (event: GestureResponderEvent) => void | null | undefined;
  onCancel?: () => void;
  onConfirm?: () => void;
  style?: StyleProp<ViewStyle>;
  overlayStyle?: StyleProp<ViewStyle>;
}

interface ContentProps {
  colorScheme?: 'light' | 'dark';
  title?: string;
  subtitle?: string;
  btnCancel?: string;
  btnConfirm?: string;
  onCancel?: () => void;
  onConfirm?: () => void;
}

const Content: FC<ContentProps> = props => {
  const {
    colorScheme = Appearance.getColorScheme() || 'light',
    title = 'Are you sure?',
    subtitle,
    btnCancel = 'No',
    btnConfirm = 'Yes',
    onCancel,
    onConfirm,
  } = props;
  return (
    <>
      <View style={{marginBottom: 16}}>
        {title && <Text preset="medium3" color={color.gray900} text={title} />}
        {subtitle && (
          <Text preset="body1" colorScheme={colorScheme} text={subtitle} />
        )}
      </View>
      <View style={BUTTON_LOGOUT_CONTAINER}>
        <Button
          testID="chatme:id/cancel-button"
          text={btnCancel}
          preset="outline"
          colorScheme={colorScheme}
          style={BUTTON_BACK_MODAL}
          onPress={onCancel}
        />
        <Button
          testID="chatme:id/confirm-button"
          text={btnConfirm}
          preset="primary"
          colorScheme={colorScheme}
          style={BUTTON_LOGOUT_MODAL}
          onPress={onConfirm}
        />
      </View>
    </>
  );
};

export const Modal: FC<ModalReactProps> = props => {
  const {
    colorScheme = 'light',
    title,
    subtitle,
    onRequestClose,
    onBackdropPress,
    onCancel,
    onConfirm,
    style,
    overlayStyle,
    children = (
      <Content
        title={title}
        subtitle={subtitle}
        colorScheme={colorScheme}
        onCancel={onCancel}
        onConfirm={onConfirm}
      />
    ),
    ...rest
  } = props;

  return (
    <ModalReact
      animationType="slide"
      transparent={true}
      onRequestClose={onRequestClose}
      {...rest}>
      <Pressable style={[CENTERED, overlayStyle]} onPressOut={onBackdropPress}>
        <View
          onStartShouldSetResponder={event => true}
          onTouchEnd={e => e.stopPropagation()}
          style={[MODAL_VIEW, style]}>
          {children}
        </View>
      </Pressable>
    </ModalReact>
  );
};
