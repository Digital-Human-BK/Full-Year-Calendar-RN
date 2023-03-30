import React, { useState, useRef } from 'react';
import { View, Text, FlatList, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const HorizontalList = () => {
  const [data, setData] = useState([
    { id: 1, text: 'Item 1' },
    { id: 2, text: 'Item 2' },
    { id: 3, text: 'Item 3' },
    { id: 4, text: 'Item 4' },
    { id: 5, text: 'Item 5' },
    { id: 6, text: 'Item 6' },
    { id: 7, text: 'Item 7' },
  ]);
  console.log(data);

  const ref = useRef<FlatList>(null);

  const scrollToIndex = (index: number) => {
    ref?.current?.scrollToIndex({
      animated: false,
      index: index,
    });
  };

  const [visibleItemIndex] = useState(3);

  const handleScroll = (event: any) => {
    const { contentOffset, layoutMeasurement, contentSize } = event.nativeEvent;

    const distanceFromEnd =
      contentSize.width - layoutMeasurement.width - contentOffset.x;

    if (distanceFromEnd < 1) {
      // add more items to the end
      console.log('adding to end');
      setTimeout(() => {
        const lastItemId = data[data.length - 1].id;
        setData(currentData => [
          ...currentData,
          { id: lastItemId + 1, text: `Item ${lastItemId + 1}` },
          { id: lastItemId + 2, text: `Item ${lastItemId + 2}` },
          { id: lastItemId + 3, text: `Item ${lastItemId + 3}` },
        ]);
      }, 500);
    } else if (contentOffset.x <= 0) {
      console.log('adding to beginning');

      // add more items to the beginning
      setTimeout(() => {
        const firstItemId = data[0].id;
        setData(currentData => [
          { id: firstItemId - 3, text: `Item ${firstItemId - 3}` },
          { id: firstItemId - 2, text: `Item ${firstItemId - 2}` },
          { id: firstItemId - 1, text: `Item ${firstItemId - 1}` },
          ...currentData,
        ]);
        scrollToIndex(3);
      }, 500);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={ref}
        data={data}
        renderItem={({ item }) => <Text style={styles.item}>{item.text}</Text>}
        keyExtractor={item => item.id.toString()}
        horizontal
        pagingEnabled
        initialScrollIndex={visibleItemIndex}
        getItemLayout={(_, index) => ({
          length: width,
          offset: width * index,
          index,
        })}
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        decelerationRate="fast"
      />
    </View>
  );
};

export default HorizontalList;

const styles = StyleSheet.create({
  container: {
    height: 100,
    backgroundColor: '#f5f5f5',
    marginVertical: 10,
  },
  item: {
    width: width - 20,
    marginHorizontal: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#f9c2ff',
  },
});
