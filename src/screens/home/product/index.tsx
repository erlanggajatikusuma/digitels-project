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
import {color, PADDING_HORIZONTAL} from '../../../theme';

const width = Dimensions.get('window').width;

const ROOT: ViewStyle = {
  flexGrow: 1,
  //   paddingHorizontal: 16,
  //   backgroundColor: 'yellow',
};

const CONTENT_CONTAINER: ViewStyle = {
  height: 240,
  flexGrow: 0,
  position: 'relative',
  backgroundColor: color.white,
};

const ITEM_WRAPPER: ViewStyle = {
  width: width,
  height: 240,
  backgroundColor: color.white,
};

const IMG: ImageStyle = {
  width: '100%',
  height: '100%',
  resizeMode: 'cover',
};

const CONTROL: ViewStyle = {
  position: 'absolute',
  top: 205,
  width: width,
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

const CONTENT: ViewStyle = {
  marginVertical: 10,
  paddingHorizontal: 16,
};

const Item: FC<{info?: ListRenderItemInfo<any>}> = props => {
  const {info} = props;
  //   console.log('ITEM IMAGES ===> ', info);

  return (
    <View style={ITEM_WRAPPER}>
      <Image source={{uri: info?.item}} style={IMG} />
    </View>
  );
};

export const ProductScreen: FC<CompositeScreenProps<any, any>> = props => {
  const {
    params: {
      brand,
      title,
      price,
      rating,
      category,
      description,
      images,
      stock,
    } = {},
  } = props.route;
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
      <View style={CONTENT}>
        <Text preset="display3" text={`$${price}`} />
        <Text text={title} numberOfLines={2} ellipsizeMode="tail" />
        {/* FLEX ROW */}
        <Text text={stock} />
        <Text text={rating} />
        {/* DETAIL PRODUCT */}
        <Text text="Detail Product" preset="title3" />
        <Text text={category} />
        <Text text="Product Description" preset="title3" />
        <Text>
          {description}. Lorem ipsum dolor sit amet, consectetur adipiscing
          elit. Phasellus non ex sit amet nunc dignissim scelerisque id ac
          lorem. Sed ipsum libero, finibus tincidunt consectetur a, rutrum id
          ante. Orci varius natoque penatibus et magnis dis parturient montes,
          nascetur ridiculus mus. Duis fringilla sit amet nisi sit amet varius.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce nec
          dapibus nibh. Quisque at ipsum nec lorem tempus finibus. Morbi congue
          efficitur libero in imperdiet. Integer sed erat pharetra, posuere urna
          quis, aliquam libero. Maecenas in faucibus nisl, ac facilisis ex.
          Donec eget aliquam diam, eget pulvinar ipsum. Nulla tellus tellus,
          suscipit eu libero a, volutpat bibendum dui. Proin sagittis turpis
          vitae tortor pellentesque euismod.
        </Text>
      </View>
    </Screen>
  );
};
