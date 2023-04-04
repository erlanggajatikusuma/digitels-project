import {CompositeScreenProps} from '@react-navigation/native';
import React, {FC, useCallback, useEffect, useMemo, useState} from 'react';
import {
  Alert,
  Image,
  ImageStyle,
  Platform,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import {
  Camera,
  PhotoFile,
  useCameraDevices,
  VideoFile,
} from 'react-native-vision-camera';
import {EmailIcon, PhoneIcon} from '../../assets';
import {Button, Screen, Text, Toast} from '../../components';
import {goBack, navigate} from '../../navigators';
import {color, FLEX_ROW, PADDING_HORIZONTAL} from '../../theme';
import * as storage from '../../utils/storage';
import RNFS from 'react-native-fs';

const ROOT: ViewStyle = {
  // paddingHorizontal: 16,
};

const IMAGE_WRAPPER: ViewStyle = {
  borderRadius: 80,
  borderWidth: 3,
  padding: 1,
  borderColor: color.gray200,
  alignSelf: 'center',
  position: 'absolute',
  bottom: -45,
  width: 94,
  height: 94,
};

const IMAGE: ImageStyle = {
  width: '100%',
  height: '100%',
  // width: 94,
  // height: 94,
  borderRadius: 60,
  resizeMode: 'cover',
  backgroundColor: color.gray200,
};

const BACKGROUND: ViewStyle = {
  position: 'relative',
  width: '100%',
  height: '30%',
  borderBottomLeftRadius: 100,
};

const TEXT: TextStyle = {
  textAlign: 'center',
  marginVertical: 5,
  paddingHorizontal: 27,
};

const INFO: ViewStyle = {
  ...PADDING_HORIZONTAL,
  borderTopWidth: 1,
  borderColor: color.gray200,
  marginTop: 20,
  flex: 1,
  justifyContent: 'center',
};

const INFO_CONTENT: ViewStyle = {
  ...FLEX_ROW,
  marginVertical: 25,
};

const INFO_RIGHT: ViewStyle = {
  flex: 1,
  paddingHorizontal: 18,
};

export const ProfileScreen: FC<CompositeScreenProps<any, any>> = props => {
  const {navigation} = props;
  const devices = useCameraDevices();
  const device = devices.back;

  const [user, setUser] = useState<any>({});
  const [hasPermission, setHasPermission] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [img, setImage] = useState<null | undefined | string>(null);

  const phone = useMemo(() => user.phoneNumber || '-', [user]);
  const image = useMemo(
    () => (img ? {uri: img} : {uri: user.photoURL}),
    [img, user],
  );

  useEffect(() => {
    storage.load('user').then(res => setUser(res));
    accessCamera();
  }, []);

  const accessCamera = async () => {
    const status = await Camera.requestCameraPermission();
    setHasPermission(status === 'authorized');
  };

  const onMediaCaptured = useCallback(
    async (media: PhotoFile | VideoFile, type: 'photo' | 'video') => {
      console.log(`Media captured! ${JSON.stringify(media)}`);
      let {path} = media; // extracted from PhotoFile returned from capture
      const filePath = `file:/${path}`;
      storage.save('local', filePath);
      setImage(filePath);
      const pathSegments = filePath.split('/');
      const fileName = pathSegments[pathSegments.length - 1];
      const dir =
        Platform.OS !== 'ios'
          ? RNFS.DownloadDirectoryPath
          : RNFS.DocumentDirectoryPath;
      // const moved = await RNFS.moveFile(path, `${dir}/${fileName}`)
      const moved = await RNFS.copyFile(path, `${dir}/${fileName}`)
        .then(() => {
          Alert.alert('Taken', 'Photo successfully saved', [{onPress: goBack}]);
        })
        .catch(() => {
          Alert.alert('Failed', 'Photo failed to saved');
        });
      return moved;
    },
    [],
  );

  const onNavigate = () => {
    if (device !== (null || undefined) && hasPermission) {
      // navigate('App.Stack', 'Profile.Stack', 'Profile.Camera');
      navigate('App.Stack', 'Profile.Stack', {
        screen: 'Profile.Camera',
        params: {onMediaCaptured},
      });
    }
  };

  const onClose = () => setIsVisible(!isVisible);

  // console.log('USER STaTE ==> ', user);
  console.log('IMAGE ==> ', img, image);

  return (
    <Screen
      preset="scroll"
      style={ROOT}
      backgroundBar={color.primary}
      safeAreaEdges={['bottom']}
      statusBar="light-content">
      <View style={[BACKGROUND, {backgroundColor: color.primary}]}>
        <View style={IMAGE_WRAPPER}>
          {/* <Image source={{uri: user.photoURL}} style={IMAGE} /> */}
          <Image source={image} style={IMAGE} />
        </View>
      </View>
      <View style={{alignItems: 'center', marginTop: 50}}>
        <Text
          preset="title2"
          text={user.displayName}
          ellipsizeMode="tail"
          numberOfLines={2}
          style={TEXT}
        />
        <Button text="Change Photo" onPress={onNavigate} preset="link" />
      </View>
      <View style={INFO}>
        <Text preset="medium3" text="Profile Info" />
        <View style={INFO_CONTENT}>
          <EmailIcon width={32} height={32} />
          <View style={INFO_RIGHT}>
            <Text text="Email" />
            <Text
              text={user.email}
              color={color.gray700}
              ellipsizeMode="tail"
              numberOfLines={1}
            />
          </View>
        </View>
        <View style={INFO_CONTENT}>
          <PhoneIcon width={32} height={32} />
          <View style={INFO_RIGHT}>
            <Text text="Phone Number" />
            <Text text={phone} color={color.gray700} />
          </View>
        </View>
      </View>
      {/* <Button text="camera" onPress={onNavigate} />
      <Button preset="outline" text="show toast" onPress={onClose} />
      <Toast visible={isVisible} onBackdropPress={onClose} onCancel={onClose} /> */}
    </Screen>
  );
};
