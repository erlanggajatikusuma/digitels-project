import React, {FC, useCallback, useEffect, useMemo, useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  ImageStyle,
  ListRenderItem,
  ListRenderItemInfo,
  View,
  ViewStyle,
} from 'react-native';
import {Button, Input, Screen, Text} from '../../components';
import {navigate} from '../../navigators';
import {color} from '../../theme';
import {getProduct, searchProduct} from '../../utils';

const height = Dimensions.get('window').height;

const ROOT: ViewStyle = {
  flexGrow: 1,
  paddingHorizontal: 16,
};

const ITEM_WRAPPER: ViewStyle = {
  flex: 1,
  backgroundColor: color.white,
  marginHorizontal: 5,
  borderRadius: 6,
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 4,
  elevation: 5,
};

const ITEM_CONTENT: ViewStyle = {
  padding: 14,
};

const IMAGE: ImageStyle = {
  width: '100%',
  height: 150,
  resizeMode: 'cover',
  borderTopRightRadius: 6,
  borderTopLeftRadius: 6,
};

const LOADING: ViewStyle = {
  height: height - 214,
  justifyContent: 'center',
  alignItems: 'center',
};

const FILTER: ViewStyle = {
  position: 'absolute',
  right: 30,
  bottom: 70,
  backgroundColor: color.bgGray,
  alignItems: 'center',
  justifyContent: 'center',
  width: 40,
  height: 40,
  borderRadius: 20,
};

const Item: FC<{info?: ListRenderItemInfo<any>}> = props => {
  const {info} = props;
  const {thumbnail, title, price, rating} = info?.item;

  // console.log('ITEM ====> ', info?.item);

  const onNavigate = () =>
    navigate('App.Stack', 'Home.Stack', {
      screen: 'Home.Product',
      params: {...info?.item},
    });

  return (
    <Button preset="link" style={ITEM_WRAPPER} onPress={onNavigate}>
      <Image style={IMAGE} source={{uri: thumbnail}} />
      <View style={ITEM_CONTENT}>
        <Text text={title} numberOfLines={2} ellipsizeMode="tail" />
        <Text text={`$ ${price}`} />
        <Text text={`rating: ${rating}`} />
      </View>
    </Button>
  );
};

export const HomeScreen: FC = props => {
  const [products, setProducts] = useState<Array<any>>([]);
  const [sorted, setSorted] = useState<Array<any>>([]);
  const [search, setSearch] = useState<Array<any>>([]);
  const [text, onChangeText] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    getProduct(0, 26).then(res => {
      setProducts(res.products);
      setLoading(false);
    });
  }, []);

  const data = useMemo(() => {
    const prod = text.length ? search : sorted.length ? sorted : products;
    // return sorted.length ? sorted : products;
    return prod;
  }, [products, search, sorted, text.length]);

  const sort = () => {
    const copy = [...products];
    const data = copy.sort((a, b) => a.price - b.price);
    setSorted(data);
    return data;
  };

  const getData = () => {
    if (products.length !== 100) {
      getProduct(products.length, 24).then(res => {
        setProducts(val => [...val, ...res.products]);
        if (sorted.length) {
          const merged = [...products, ...res.products];
          merged.sort((a, b) => a.price - b.price);
          setSorted(merged);
        }
      });
    }
  };

  const onSearch = () => {
    if (text.length) {
      searchProduct(text.toLocaleLowerCase()).then(res => {
        console.log('SEARCHED ===> ', res);
        setSearch(res.products);
      });
    }
  };

  const renderItem: ListRenderItem<any> = useCallback(
    info => <Item info={info} />,
    [],
  );

  const keyExtractor = useCallback((item: {id: any}) => `${item.id}`, []);

  console.log('LOADING....', loading);
  return (
    <Screen preset="fixed" safeAreaEdges={['top']} style={ROOT}>
      <Input
        value={text}
        onChangeText={onChangeText}
        onSubmitEditing={onSearch}
      />

      <FlatList
        keyExtractor={keyExtractor}
        data={data}
        renderItem={renderItem}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        onEndReached={getData}
        ItemSeparatorComponent={() => <View style={{height: 28}} />}
        fadingEdgeLength={64}
        ListEmptyComponent={
          (loading && (
            <View style={LOADING}>
              <ActivityIndicator />
            </View>
          )) || (
            <View style={LOADING}>
              <Text preset="title1" text="No data..." />
            </View>
          )
        }
      />
      <View style={FILTER}>
        {/* FILTER */}
        <Button
          textColor={color.blackBase}
          preset="link"
          text="Sort"
          onPress={sort}
        />
      </View>
    </Screen>
  );
};
