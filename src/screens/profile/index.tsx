import React, {FC, useEffect, useState} from 'react';
import {Text, ViewStyle} from 'react-native';
import {Camera, useCameraDevices} from 'react-native-vision-camera';
import {Button, FieldInput, Screen, Toast} from '../../components';
import {navigate} from '../../navigators';

const ROOT: ViewStyle = {
  paddingHorizontal: 16,
};

export const ProfileScreen: FC = props => {
  const devices = useCameraDevices();
  const device = devices.back;

  const [hasPermission, setHasPermission] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    accessCamera();
  }, []);

  const accessCamera = async () => {
    const status = await Camera.requestCameraPermission();
    setHasPermission(status === 'authorized');
  };

  const onNavigate = () => {
    if (device !== (null || undefined) && hasPermission) {
      navigate('App.Stack', 'Profile.Stack', 'Profile.Camera');
    }
  };

  const onClose = () => setIsVisible(!isVisible);

  return (
    <Screen preset="scroll" style={ROOT}>
      <FieldInput label="Name" />
      <FieldInput label="Email" validate="email" />
      <FieldInput label="Password" validate="password" />
      <Button text="camera" onPress={onNavigate} />
      <Toast visible={isVisible} onBackdropPress={onClose} onCancel={onClose} />
    </Screen>
  );
};
