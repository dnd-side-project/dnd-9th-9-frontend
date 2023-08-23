import React, {useEffect, useRef, useState} from 'react';

import {FlatList, View} from 'react-native';

interface ICarouselProps {
  renderItem: (value: any) => React.JSX.Element;
  data: any[];
  intervalTime?: number;
}

export const Carousel = ({
  renderItem,
  data,
  intervalTime = 3000,
}: ICarouselProps): React.JSX.Element => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList<typeof renderItem> | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % data.length;

      flatListRef?.current?.scrollToIndex({index: nextIndex, animated: true});
      setCurrentIndex(nextIndex);
    }, intervalTime);

    return () => {
      clearInterval(interval);
    };
  }, [currentIndex]);

  return (
    <View>
      <FlatList
        ref={flatListRef}
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};
