import {CompositeScreenProps} from '@react-navigation/native';
import React, {FC, useCallback} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  ImageStyle,
  ListRenderItem,
  ListRenderItemInfo,
  View,
  ViewStyle,
} from 'react-native';
import {Screen, Text} from '../../../components';

const width = Dimensions.get('window').width;

const ROOT: ViewStyle = {
  flexGrow: 1,
  paddingHorizontal: 16,
  backgroundColor: 'yellow',
};

const IMG: ImageStyle = {
  width: '100%',
  height: 200,
  resizeMode: 'cover',
};

const Item: FC<{info?: ListRenderItemInfo<any>}> = props => {
  const {info} = props;
  console.log('ITEM IMAGES ===> ', info);

  return (
    <View
      style={{
        width: width - 32,
        height: 200,
        borderWidth: 2,
        borderColor: 'red',
      }}>
      <Image source={{uri: info?.item}} style={IMG} />
    </View>
  );
};

export const ProductScreen: FC<CompositeScreenProps<any, any>> = props => {
  const {params: {brand, category, description, images, stock} = {}} =
    props.route;
  console.log('PARAMS ==> ', props.route.params);

  const renderItem: ListRenderItem<any> = useCallback(
    info => <Item info={info} />,
    [],
  );

  const keyExtractor = useCallback((index: any) => index, []);

  return (
    <Screen preset="scroll" safeAreaEdges={['bottom']} style={ROOT}>
      <Text text={brand} />
      <Text text={category} />
      <Text text={description} />
      <Text text={stock} />
      <FlatList
        data={images}
        keyExtractor={keyExtractor}
        pagingEnabled
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={renderItem}
      />
    </Screen>
  );
};
