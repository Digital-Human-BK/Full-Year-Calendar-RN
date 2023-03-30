import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Dimensions,
  ScrollView,
} from 'react-native';

const { width } = Dimensions.get('window');

const ITEM_WIDTH = Dimensions.get('window').width;

const HorizontalFlatList = () => {
  const [data, setData] = useState([0, 1, 2, 3, 4]);
  const [scrollOffset, setScrollOffset] = useState(0);
  const scrollViewRef = useRef(null);

  useEffect(() => {
    if (scrollOffset <= ITEM_WIDTH) {
      // Add three items at the beginning of the list
      const newData = [5, 6, 7, ...data];
      setData(newData);
      // Reset the scroll position to keep the current item visible
      //@ts-ignore
      scrollViewRef.current.scrollTo({ x: ITEM_WIDTH * 3, animated: false });
      setScrollOffset(ITEM_WIDTH * 3);
    }
  }, [scrollOffset, data]);

  const renderItem = ({ item }: any) => {
    return (
      <View style={styles.container}>
        <Text style={styles.item}>{item}</Text>
      </View>
    );
  };

  return (
    <ScrollView
      ref={scrollViewRef}
      horizontal
      pagingEnabled
      onScroll={event => setScrollOffset(event.nativeEvent.contentOffset.x)}
      scrollEventThrottle={16}>
      <FlatList
        data={data}
        keyExtractor={item => String(item)}
        renderItem={renderItem}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </ScrollView>
  );
};

export default HorizontalFlatList;

const styles = StyleSheet.create({
  container: {
    height: 100,
    backgroundColor: '#f5f5f5',
    marginVertical: 10,
  },
  item: {
    height: 100,
    width: width - 20,
    marginHorizontal: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#f9c2ff',
  },
});
