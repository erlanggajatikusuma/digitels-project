import React, {FC} from 'react';
import {
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
import {CloseIcon} from '../../assets';
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
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 3,
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
  // padding: 12,
};

const BUTTON_LOGOUT_MODAL: ViewStyle = {
  width: '48%',
  borderRadius: 5,
  paddingVertical: 10,
};

const BUTTON_BACK_MODAL: ViewStyle = {
  // ...BUTTON_LOGOUT_MODAL,
  // backgroundColor: 'green',
  // paddingVertical: 9,
};

const PROGRESS_BAR: ViewStyle = {
  height: 5,
  flexDirection: 'row',
  width: '100%',
  backgroundColor: 'white',
  borderColor: '#000',
  // borderWidth: 2,
  // borderRadius: 5,
};

interface ToastModal extends ModalProps {
  colorScheme?: 'light' | 'dark';
  title?: string;
  subtitle?: string;
  children?: React.ReactNode;
  onRequestClose?: (event: NativeSyntheticEvent<any>) => void | undefined;
  onBackdropPress?: (event: GestureResponderEvent) => void | null | undefined;
  onCancel?: () => void;
  style?: StyleProp<ViewStyle>;
  overlayStyle?: StyleProp<ViewStyle>;
}

interface ContentProps {
  colorScheme?: 'light' | 'dark';
  title?: string;
  onCancel?: () => void;
}

const Content: FC<ContentProps> = props => {
  const {
    colorScheme = 'light',
    title = 'Something went wrong!',
    onCancel,
  } = props;
  return (
    <>
      <View style={BUTTON_LOGOUT_CONTAINER}>
        {title && <Text preset="medium3" color={color.gray900} text={title} />}
        <Button
          testID="chatme:id/cancel-button"
          preset="link"
          colorScheme={colorScheme}
          onPress={onCancel}>
          <CloseIcon />
        </Button>
      </View>
    </>
  );
};

export const Toast: FC<ToastModal> = props => {
  const {
    colorScheme = 'light',
    title,
    onRequestClose,
    onBackdropPress,
    onCancel,
    style,
    overlayStyle,
    children = (
      <Content title={title} colorScheme={colorScheme} onCancel={onCancel} />
    ),
    ...rest
  } = props;

  // const countInterval = useRef<number>(null);
  // const [count, setCount] = useState<number>(0);
  // const stopInterval = useCallback(() => {
  //   if (countInterval.current) {
  //     // clearInterval(countInterval);
  //     clearInterval(countInterval.current);
  //     countInterval.current = null;
  //   }
  // }, []);

  // const startInterval = useCallback(() => {
  //   if (countInterval.current) {
  //     stopInterval();
  //   }
  //   countInterval.current = setInterval(() => setCount(old => old + 34), 1000);
  //   return stopInterval;
  // }, [stopInterval]);

  // const animation = useMemo(() => new Animated.Value(0), []);

  // const animatedWidth = animation.interpolate({
  //   inputRange: [0, 100],
  //   outputRange: ['0%', '100%'],
  //   extrapolate: 'clamp',
  // });

  // useEffect(() => {
  //   if (timeout) {
  //     startInterval();
  //     setIsVisible(true);
  //     setTimeout(() => {
  //       setIsVisible(false);
  //     }, 3300);
  //   }
  // }, [startInterval, timeout]);
  // const load = useCallback(
  //   (c: number) => {
  //     Animated.timing(animation, {
  //       toValue: c,
  //       duration: 50,
  //       useNativeDriver: false,
  //     }).start();
  //   },
  //   [animation],
  // );

  // useEffect(() => {
  //   load(count);
  //   if (count >= 100) {
  //     setCount(100);
  //     stopInterval();
  //   }
  // }, [count, load, stopInterval]);

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
        {/* <View style={PROGRESS_BAR}>
          <Animated.View
            style={[
              StyleSheet.absoluteFill,
              {backgroundColor: 'red', width: animatedWidth},
            ]}
          />
        </View> */}
      </Pressable>
    </ModalReact>
  );
};
