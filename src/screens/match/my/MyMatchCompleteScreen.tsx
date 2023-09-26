import React from 'react';

import styled from '@emotion/native';
import {FlatList, View} from 'react-native';

import {Text} from '../../../components/Text';
import {MyMatchListItem} from '../../../features/match/components/MyMatch';
import {useGetInfiniteUserFieldCompleted} from '../../../features/match/hooks/userField';

export const MyMatchCompleteScreen = (): React.JSX.Element => {
  const {
    data: completedMatchData,
    isLoading: isLoadingCompletedMatch,
    fetchNextPage: fetchNextPageCompletedMatch,
    hasNextPage: hasNextPageCompletedMatch,
    isFetchingNextPage: isFetchingNextPageCompletedMatch,
  } = useGetInfiniteUserFieldCompleted({
    fieldType: null,
    page: 0,
    size: 3,
  });

  if (isLoadingCompletedMatch) return <View></View>;
  return (
    <View>
      <FlatList
        scrollEnabled={false}
        data={completedMatchData?.pages
          .map(page => page.completedFields)
          .flat()}
        keyExtractor={(item, idx) => `complete-${item.fieldType}-${idx}`}
        renderItem={({item}) => (
          <MyMatchListItem
            fieldId={item.id}
            currentSize={item.currentSize}
            fieldType={item.fieldType}
            maxSize={item.maxSize}
            name={item.name}
            period={item.period}
            skillLevel={item.skillLevel}
          />
        )}
        ListEmptyComponent={() => (
          <StyledNonDataWrapper>
            <Text
              type="body2"
              color="gray-400"
              fontWeight="600"
              text="진행 완료 매칭이 존재하지 않습니다."
            />
          </StyledNonDataWrapper>
        )}
      />
      {(hasNextPageCompletedMatch ?? false) &&
        !isFetchingNextPageCompletedMatch && (
          <StyledMoreWrapper
            activeOpacity={0.8}
            onPress={() => fetchNextPageCompletedMatch}>
            <Text type="body2" fontWeight="400" text="더보기" />
          </StyledMoreWrapper>
        )}
    </View>
  );
};

const StyledMoreWrapper = styled.TouchableOpacity`
  margin: 22px auto 20px auto;
`;

const StyledNonDataWrapper = styled.View`
  text-align: center;
  margin: 40px auto 40px auto;
`;
