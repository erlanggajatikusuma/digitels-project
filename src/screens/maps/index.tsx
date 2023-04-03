import React, {FC, useMemo, useState} from 'react';
import {Platform, ViewStyle} from 'react-native';
import MapView, {
  MapPressEvent,
  Marker,
  MarkerDragStartEndEvent,
  PROVIDER_DEFAULT,
  PROVIDER_GOOGLE,
  Region,
} from 'react-native-maps';
import {Screen} from '../../components';

const ROOT: ViewStyle = {
  flexGrow: 1,
};

const MAP: ViewStyle = {
  flex: 1,
};

export const MapScreen: FC = props => {
  const [region, setRegion] = useState({
    latitude: 51.5079145,
    longitude: -0.0899163,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  const [markers, setMarkers] = useState<Array<any>>([]);

  const initialRegion = useMemo(() => {
    return {
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    };
  }, []);

  const PROVIDER = Platform.OS === 'ios' ? PROVIDER_DEFAULT : PROVIDER_GOOGLE;

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
      <MapView
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
    </Screen>
  );
};
