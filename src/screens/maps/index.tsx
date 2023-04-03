import Geolocation from '@react-native-community/geolocation';
import React, {FC, useEffect, useMemo, useRef, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  PermissionsAndroid,
  Platform,
  View,
  ViewStyle,
} from 'react-native';
import MapView, {
  MapPressEvent,
  Marker,
  MarkerDragStartEndEvent,
  PROVIDER_DEFAULT,
  PROVIDER_GOOGLE,
  Region,
} from 'react-native-maps';
import {Button, Screen} from '../../components';

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

const ROOT: ViewStyle = {
  flexGrow: 1,
  position: 'relative',
};

const MAP: ViewStyle = {
  flex: 1,
};

const LOADING: ViewStyle = {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
};

const BTN: ViewStyle = {
  // backgroundColor: color.white,
  backgroundColor: 'rgba(255,255,255,0.7)',
  position: 'absolute',
  bottom: 15,
  alignSelf: 'center',
  borderRadius: 40,
};

const ASPECT_RATIO = width / height;

export const MapScreen: FC = props => {
  const [initialRegion, setInitialRegion] = useState<any | null>(null);
  const [region, setRegion] = useState<any>();
  // const [region, setRegion] = useState({
  //   latitude: 51.5079145,
  //   longitude: -0.0899163,
  //   latitudeDelta: 0.01,
  //   longitudeDelta: 0.01,
  // });
  const [position, setPosition] = useState<any | null>(null);
  const [markers, setMarkers] = useState<Array<any>>([]);
  const [hasPermission, setHasPermission] = useState<boolean>(false);

  const ANDROID = Platform.OS === 'android';
  const PROVIDER = Platform.OS === 'ios' ? PROVIDER_DEFAULT : PROVIDER_GOOGLE;
  const LATITUDE_DELTA = 0.0922;
  const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

  const mapViewRef = useRef<MapView>(null);
  const coordinate = useMemo(() => {
    return {
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
      // longitudeDelta: 0.0421,
    };
  }, []);

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message: 'Application needs access to your location.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === 'granted') {
        getCurrentPosition();
      } else {
        Alert.alert('Location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const getCurrentPosition = async () => {
    await Geolocation.getCurrentPosition(
      pos => {
        const coords = pos?.coords;

        setPosition(coords);
        setInitialRegion({...coordinate, ...coords});
        setRegion({...coordinate, ...coords});
        setMarkers([{...coords}]);
        setHasPermission(true);
      },
      error => Alert.alert('GetCurrentPosition Error', JSON.stringify(error)),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 10000},
    );
  };

  useEffect(() => {
    if (!hasPermission && ANDROID) {
      requestLocationPermission();
    } else {
      getCurrentPosition();
    }
  }, []);

  const onMyLocation = () => {
    mapViewRef.current?.animateToRegion({...position}, 300);
  };

  const onRegionChange = (reg: Region) => setRegion(reg);

  const onMapPress = (e: MapPressEvent) => {
    e.persist();
    setMarkers(marker => [...marker, {...e?.nativeEvent?.coordinate}]);
  };

  const onDrag = (e: MarkerDragStartEndEvent, idx: number) => {
    e.persist();
    const arr = [...markers];
    let objIndex;
    objIndex = arr.findIndex((obj, index) => index === idx);
    arr[objIndex] = e?.nativeEvent?.coordinate;
    setMarkers(arr);
  };

  return (
    <Screen
      preset="fixed"
      backgroundBar="transparent"
      statusBar="light-content"
      statusBarTranslucent
      unsafe
      style={ROOT}>
      {hasPermission ? (
        <MapView
          ref={mapViewRef}
          provider={PROVIDER}
          style={MAP}
          initialRegion={initialRegion}
          region={region}
          // followsUserLocation
          // onPoiClick={}
          onPress={onMapPress}
          onRegionChangeComplete={onRegionChange}>
          {markers.map((marker, index) => (
            <Marker
              key={index}
              draggable
              onDragEnd={e => onDrag(e, index)}
              coordinate={marker}
            />
          ))}
        </MapView>
      ) : (
        <View style={LOADING}>
          <ActivityIndicator />
        </View>
      )}
      <Button
        style={BTN}
        textColor="rgba(0,0,0,0.7)"
        text="current location"
        onPress={onMyLocation}
      />
    </Screen>
  );
};
