import React, {
  FC,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  Alert,
  Animated,
  LayoutChangeEvent,
  Platform,
  StatusBar,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import Reanimated, {
  runOnJS,
  useAnimatedProps,
  useSharedValue,
} from 'react-native-reanimated';
import {
  Camera,
  CameraDeviceFormat,
  CameraRuntimeError,
  FrameProcessorPerformanceSuggestion,
  frameRateIncluded,
  PhotoFile,
  sortFormats,
  TakePhotoOptions,
  TakeSnapshotOptions,
  useCameraDevices,
  useFrameProcessor,
  VideoFile,
} from 'react-native-vision-camera';
import {Text} from '../../components';
import {
  Back,
  CameraReverse,
  Flashoff,
  Flashon,
  HDROff,
  HDROn,
  NightOff,
  NightOn,
} from '../../assets';
import {
  CAPTURE_BUTTON_SIZE,
  color,
  CONTENT_SPACING,
  SAFE_AREA_PADDING,
} from '../../theme';
import {goBack} from '../../navigators';
import RNFS from 'react-native-fs';
import * as storage from '../../utils/storage';
import {CompositeScreenProps} from '@react-navigation/native';
// import {StatusBarBlurBackground} from "./status-bar-blur-background/status-bar-blur-background";

const SCALE_FULL_ZOOM = 3;
const BUTTON_SIZE = 40;
const MAX_ZOOM_FACTOR = 20;
const BORDER_WIDTH = CAPTURE_BUTTON_SIZE * 0.1;

const CONTAINER: ViewStyle = {
  flex: 1,
  backgroundColor: 'black',
  position: 'relative',
};

const RIGHT_BTN_ROW: ViewStyle = {
  position: 'absolute',
  right: SAFE_AREA_PADDING.paddingRight,
  top: SAFE_AREA_PADDING.paddingTop + 15,
};

const LEFT_BTN_ROW: ViewStyle = {
  position: 'absolute',
  left: SAFE_AREA_PADDING.paddingLeft,
  top: SAFE_AREA_PADDING.paddingTop + 15,
};

const BUTTON: ViewStyle = {
  marginBottom: CONTENT_SPACING,
  width: BUTTON_SIZE,
  height: BUTTON_SIZE,
  borderRadius: BUTTON_SIZE / 2,
  backgroundColor: 'rgba(140, 140, 140, 0.3)',
  justifyContent: 'center',
  alignItems: 'center',
};

const BTN: ViewStyle = {
  width: CAPTURE_BUTTON_SIZE,
  height: CAPTURE_BUTTON_SIZE,
  borderRadius: CAPTURE_BUTTON_SIZE / 2,
  borderWidth: BORDER_WIDTH,
  borderColor: 'white',
};

const CAPTURE_BUTTON: ViewStyle = {
  position: 'absolute',
  alignSelf: 'center',
  bottom: SAFE_AREA_PADDING.paddingBottom,
};

const SHADOW: ViewStyle = {
  position: 'absolute',
  width: CAPTURE_BUTTON_SIZE,
  height: CAPTURE_BUTTON_SIZE,
  borderRadius: CAPTURE_BUTTON_SIZE / 2,
  backgroundColor: '#e34077',
};

const TEXT: TextStyle = {
  color: 'white',
  fontSize: 11,
  fontWeight: 'bold',
  textAlign: 'center',
};

interface CameraProps {
  onMediaCaptured?: (
    media: PhotoFile | VideoFile,
    type: 'photo' | 'video',
  ) => void;
}

const ReanimatedCamera = Reanimated.createAnimatedComponent(Camera);
Reanimated.addWhitelistedNativeProps({
  zoom: true,
});

export const CameraScreen: FC<CompositeScreenProps<any, any>> = props => {
  const {
    params: {onMediaCaptured = () => {}},
  } = props.route;
  const camera = useRef<Camera>(null);

  const [isCameraInitialized, setIsCameraInitialized] = useState<boolean>(true);
  const [hasMicrophonePermission, setHasMicrophonePermission] =
    useState<boolean>(false);
  const zoom = useSharedValue(0);
  const isPressingButton = useSharedValue(false);

  const [cameraPosition, setCameraPosition] = useState<'front' | 'back'>(
    'back',
  );
  const [enableHdr, setEnableHdr] = useState<boolean>(false);
  const [flash, setFlash] = useState<'off' | 'on'>('off');
  const [enableNightMode, setEnableNightMode] = useState<boolean>(false);

  const devices = useCameraDevices();
  const device = devices[cameraPosition];
  const formats = useMemo<CameraDeviceFormat[]>(() => {
    if (device?.formats === (null || undefined)) {
      return [];
    }
    return device.formats.sort(sortFormats);
  }, [device?.formats]);

  const [is60Fps, setIs60Fps] = useState<boolean>(false);
  const [suggestionFps, setSuggestionFps] = useState<number>(30);
  const fps = useMemo(() => {
    if (!is60Fps) {
      return 30;
    }

    if (enableNightMode && !device?.supportsLowLightBoost) {
      // User has enabled Night Mode, but Night Mode is not natively supported, so we simulate it by lowering the frame rate.
      return 30;
    }

    const supportsHdrAt60Fps = formats.some(
      f =>
        f.supportsVideoHDR &&
        f.frameRateRanges.some(r => frameRateIncluded(r, 60)),
    );
    if (enableHdr && !supportsHdrAt60Fps) {
      // User has enabled HDR, but HDR is not supported at 60 FPS.
      return 30;
    }

    const supports60Fps = formats.some(f =>
      f.frameRateRanges.some(r => frameRateIncluded(r, 60)),
    );
    if (!supports60Fps) {
      // 60 FPS is not supported by any format.
      return 30;
    }
    // If nothing blocks us from using it, we default to 60 FPS.
    return suggestionFps || 60;
  }, [
    device?.supportsLowLightBoost,
    enableHdr,
    enableNightMode,
    formats,
    is60Fps,
    suggestionFps,
  ]);

  const supportsCameraFlipping = useMemo(
    () => devices.back != null && devices.front != null,
    [devices.back, devices.front],
  );

  const supportsFlash = device?.hasFlash ?? false;

  const supportsHdr = useMemo(
    () => formats.some(f => f.supportsVideoHDR || f.supportsPhotoHDR),
    [formats],
  );

  const supports60Fps = useMemo(
    () =>
      formats.some(f =>
        f.frameRateRanges.some(rate => frameRateIncluded(rate, 60)),
      ),
    [formats],
  );

  const canToggleNightMode = enableNightMode
    ? true // it's enabled so you have to be able to turn it off again
    : (device?.supportsLowLightBoost ?? false) || fps > 30; // either we have native support, or we can lower the FPS

  const format = useMemo(() => {
    let result = formats;
    if (enableHdr) {
      // We only filter by HDR capable formats if HDR is set to true.
      // Otherwise we ignore the `supportsVideoHDR` property and accept formats which support HDR `true` or `false`
      result = result.filter(f => f.supportsVideoHDR || f.supportsPhotoHDR);
    }

    // find the first format that includes the given FPS
    return result.find(f =>
      f.frameRateRanges.some(r => frameRateIncluded(r, fps)),
    );
  }, [formats, fps, enableHdr]);

  //#region Animated Zoom
  // This just maps the zoom factor to a percentage value.
  // so e.g. for [min, neutr., max] values [1, 2, 128] this would result in [0, 0.0081, 1]
  const minZoom = device?.minZoom ?? 1;
  const maxZoom = Math.min(device?.maxZoom ?? 1, MAX_ZOOM_FACTOR);

  const cameraAnimatedProps = useAnimatedProps(() => {
    const z = Math.max(Math.min(zoom.value, maxZoom), minZoom);
    return {
      zoom: z,
    };
  }, [maxZoom, minZoom, zoom]);
  //#endregion

  //#region Callbacks
  //   const setIsPressingButton = useCallback(
  //     (_isPressingButton: boolean) => {
  //       isPressingButton.value = _isPressingButton;
  //     },
  //     [isPressingButton],
  //   );
  // Camera callbacks
  const onError = useCallback((error: CameraRuntimeError) => {
    console.error(error);
    return Alert.alert('Camera', JSON.stringify(error));
  }, []);

  const onInitialized = useCallback(() => {
    console.log('Camera initialized!');
    setIsCameraInitialized(true);
  }, []);

  // const onMediaCaptured = useCallback(
  //   async (media: PhotoFile | VideoFile, type: 'photo' | 'video') => {
  //     console.log(`Media captured! ${JSON.stringify(media)}`);
  //     let {path} = media; // extracted from PhotoFile returned from capture
  //     storage.save('local', path);
  //     const filePath = `file:/${path}`;
  //     const pathSegments = filePath.split('/');
  //     const fileName = pathSegments[pathSegments.length - 1];
  //     const dir =
  //       Platform.OS !== 'ios'
  //         ? RNFS.DownloadDirectoryPath
  //         : RNFS.DocumentDirectoryPath;
  //     const moved = await RNFS.moveFile(path, `${dir}/${fileName}`)
  //       .then(() => {
  //         Alert.alert('Taken', 'Photo successfully saved', [{onPress: goBack}]);
  //       })
  //       .catch(() => {
  //         Alert.alert('Failed', 'Photo failed to saved');
  //       });
  //     return moved;
  //   },
  //   [],
  // );

  const onFlipCameraPressed = useCallback(() => {
    setCameraPosition(p => (p === 'back' ? 'front' : 'back'));
  }, []);

  const onFlashPressed = useCallback(() => {
    setFlash(f => (f === 'off' ? 'on' : 'off'));
  }, []);
  //#endregion

  //#region Effects
  const neutralZoom = device?.neutralZoom ?? 1;
  useEffect(() => {
    // Run everytime the neutralZoomScaled value changes. (reset zoom when device changes)
    zoom.value = neutralZoom;
  }, [neutralZoom, zoom]);

  useEffect(() => {
    Camera.getMicrophonePermissionStatus().then(status =>
      setHasMicrophonePermission(status === 'authorized'),
    );
  }, []);

  //#endregion

  // if (device != null && format != null) {
  //   console.log(
  //     `Re-rendering camera page with ${true ? "active" : "inactive"} camera. ` +
  //       `Device: "${device.name}" (${format.photoWidth}x${format.photoHeight} @ ${fps}fps)`,
  //   );
  // } else {
  //   console.log("re-rendering camera page without active camera");
  // }

  const frameProcessor = useFrameProcessor(frame => {
    'worklet';
    // const values = examplePlugin(frame);
    const values = frame;
    // console.log(`Return FrameProcessor Values: ${JSON.stringify(values)}`);
    // return Alert.alert("Taken", JSON.stringify(values), [{onPress: onBack}]);
  }, []);

  const onFrameProcessorSuggestionAvailable = useCallback(
    (suggestion: FrameProcessorPerformanceSuggestion) => {
      setSuggestionFps(suggestion.suggestedFrameProcessorFps);
    },
    [],
  );

  // PHOTO
  const takePhotoOptions = useMemo<TakePhotoOptions & TakeSnapshotOptions>(
    () => ({
      photoCodec: 'jpeg',
      qualityPrioritization: 'speed',
      flash: flash,
      quality: 90,
      skipMetadata: true,
    }),
    [flash],
  );

  const takePhoto = useCallback(async () => {
    try {
      if (camera.current === (null || undefined)) {
        throw new Error('Camera ref is null!');
      }

      console.log('Taking photo...');
      const photo = await camera.current.takePhoto(takePhotoOptions);
      onMediaCaptured(photo, 'photo');
    } catch (e) {
      console.error('Failed to take photo!', e);
    }
  }, [camera, onMediaCaptured, takePhotoOptions]);

  return (
    <View style={CONTAINER}>
      <StatusBar translucent backgroundColor="transparent" />
      {device !== (null || undefined) && (
        <Reanimated.View style={StyleSheet.absoluteFill}>
          <ReanimatedCamera
            ref={camera}
            style={StyleSheet.absoluteFill}
            device={device}
            format={format}
            fps={fps}
            hdr={enableHdr}
            isActive={true}
            onInitialized={onInitialized}
            onError={onError}
            enableZoomGesture={false}
            animatedProps={cameraAnimatedProps}
            photo={true}
            audio={hasMicrophonePermission}
            frameProcessor={frameProcessor}
            orientation="portrait"
            frameProcessorFps={1}
            onFrameProcessorPerformanceSuggestionAvailable={
              onFrameProcessorSuggestionAvailable
            }
          />

          {/* CAPTURE BUTTON HERE */}
          <TouchableOpacity onPress={takePhoto} style={CAPTURE_BUTTON}>
            <Reanimated.View {...props}>
              <Reanimated.View style={{flex: 1}}>
                <Reanimated.View style={SHADOW} />
                <View style={BTN} />
              </Reanimated.View>
            </Reanimated.View>
          </TouchableOpacity>

          {/* <StatusBarBlurBackground /> */}

          <TouchableOpacity style={LEFT_BTN_ROW} onPress={goBack}>
            <Back color={color.white} width={24} height={24} />
          </TouchableOpacity>
          <View style={RIGHT_BTN_ROW}>
            {supportsCameraFlipping && (
              <TouchableOpacity style={BUTTON} onPress={onFlipCameraPressed}>
                <CameraReverse />
              </TouchableOpacity>
            )}
            {supportsFlash && (
              <TouchableOpacity style={BUTTON} onPress={onFlashPressed}>
                {flash === 'on' ? <Flashon /> : <Flashoff />}
              </TouchableOpacity>
            )}
            {suggestionFps === 60 && (
              <TouchableOpacity
                style={BUTTON}
                onPress={() => setIs60Fps(!is60Fps)}>
                <Text style={TEXT}>
                  {is60Fps ? '60' : '30'}
                  {'\n'}FPS
                </Text>
              </TouchableOpacity>
            )}
            {supportsHdr && (
              <TouchableOpacity
                style={BUTTON}
                onPress={() => setEnableHdr(h => !h)}>
                {enableHdr ? <HDROn /> : <HDROff />}
              </TouchableOpacity>
            )}
            {canToggleNightMode && (
              <TouchableOpacity
                style={BUTTON}
                onPress={() => setEnableNightMode(!enableNightMode)}>
                {enableNightMode ? <NightOn /> : <NightOff />}
              </TouchableOpacity>
            )}
          </View>
        </Reanimated.View>
      )}
    </View>
  );
};
