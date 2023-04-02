import {CompositeScreenProps} from '@react-navigation/native';
import React, {createRef, FC, useCallback, useRef, useState} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  ImageStyle,
  ListRenderItem,
  ListRenderItemInfo,
  NativeScrollEvent,
  NativeSyntheticEvent,
  View,
  ViewStyle,
} from 'react-native';
import {Screen, Text} from '../../../components';
import {color} from '../../../theme';

const width = Dimensions.get('window').width;

const ROOT: ViewStyle = {
  flexGrow: 1,
  paddingHorizontal: 16,
  //   backgroundColor: 'yellow',
};

const CONTENT_CONTAINER: ViewStyle = {
  height: 240,
  flexGrow: 0,
  position: 'relative',
};

const IMG: ImageStyle = {
  width: '100%',
  height: 230,
  resizeMode: 'cover',
};

const CONTROL: ViewStyle = {
  position: 'absolute',
  top: 200,
  width: width - 32,
};

const DOT_CONTAINER: ViewStyle = {
  flexDirection: 'row',
  justifyContent: 'center',
  marginVertical: 10,
};

const DOT: ViewStyle = {
  width: 10,
  height: 10,
  borderRadius: 10,
  marginHorizontal: 5,
  borderWidth: 1.5,
  //   borderColor: '#ffffff',
  borderColor: color.light400,
};

const ACTIVE: ViewStyle = {
  backgroundColor: color.light100,
};

const Item: FC<{info?: ListRenderItemInfo<any>}> = props => {
  const {info} = props;
  //   console.log('ITEM IMAGES ===> ', info);

  return (
    <View
      style={{
        width: width - 32,
        height: 230,
        borderWidth: 2,
        // borderColor: 'red',
      }}>
      <Image source={{uri: info?.item}} style={IMG} />
    </View>
  );
};

export const ProductScreen: FC<CompositeScreenProps<any, any>> = props => {
  const {params: {brand, category, description, images, stock} = {}} =
    props.route;
  console.log('PARAMS ==> ', props.route.params);

  const [sliderState, setSliderState] = useState({
    item: 0,
    offset: 0,
  });

  const slider = createRef<FlatList<any>>();

  const slideChange = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const item = Math.round(e.nativeEvent.contentOffset.x / width);
    setSliderState({
      item: item,
      offset: item * width,
    });
  };

  const renderItem: ListRenderItem<any> = useCallback(
    info => <Item info={info} />,
    [],
  );

  const Dots: FC = useCallback(
    () => (
      <View style={DOT_CONTAINER}>
        {images?.map((_, index: number) => (
          <View
            key={index}
            style={[DOT, sliderState.item !== index ? null : ACTIVE]}
          />
        ))}
      </View>
    ),
    [images, sliderState.item],
  );

  const keyExtractor = useCallback((index: any) => index, []);

  return (
    <Screen preset="scroll" safeAreaEdges={['bottom']} style={ROOT}>
      <FlatList
        data={images}
        ref={slider}
        keyExtractor={keyExtractor}
        style={CONTENT_CONTAINER}
        pagingEnabled
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={renderItem}
        onScroll={slideChange}
        getItemLayout={(_, index) => ({
          length: width,
          offset: width * index,
          index,
        })}
      />
      <View style={CONTROL}>
        <Dots />
      </View>
      <Text text={brand} />
      <Text text={category} />
      <Text text={description} />
      <Text text={stock} />
    </Screen>
  );
};
