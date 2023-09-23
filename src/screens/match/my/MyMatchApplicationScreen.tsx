import React from 'react';

import styled from '@emotion/native';
import {FlatList, View} from 'react-native';

import {Gap} from '../../../components/Gap';
import {Line} from '../../../components/Line';
import {Text} from '../../../components/Text';
import {MyMatchListItem} from '../../../features/match/components/MyMatch';
import {useGetInfiniteFieldEntry} from '../../../features/match/hooks/fieldEntry';

export const MyMatchApplicationScreen = (): React.JSX.Element => {
  const {
    data: teamFieldEntryData,
    isLoading: isLoadingTeamFieldEntry,
    fetchNextPage: fetchNextPageTeamFieldEntry,
    hasNextPage: hasNextPageTeamFieldEntry,
    isFetchingNextPage: isFetchingNextPageTeamFieldEntry,
  } = useGetInfiniteFieldEntry({
    fieldType: 'TEAM',
    page: 0,
    size: 3,
  });

  const {
    data: duelFieldEntryData,
    isLoading: isLoadingDuelFieldEntry,
    fetchNextPage: fetchNextPageDuelFieldEntry,
    hasNextPage: hasNextPageDuelFieldEntry,
    isFetchingNextPage: isFetchingNextPageDuelFieldEntry,
  } = useGetInfiniteFieldEntry({
    fieldType: 'DUEL',
    page: 0,
    size: 3,
  });

  const {
    data: teamBattleFieldEntryData,
    isLoading: isLoadingTeamBattleFieldEntry,
    fetchNextPage: fetchNextPageTeamBattleFieldEntry,
    hasNextPage: hasNextPageTeamBattleFieldEntry,
    isFetchingNextPage: isFetchingNextPageTeamBattleFieldEntry,
  } = useGetInfiniteFieldEntry({
    fieldType: 'TEAM_BATTLE',
    page: 0,
    size: 3,
  });

  if (
    isLoadingDuelFieldEntry ||
    isLoadingTeamFieldEntry ||
    isLoadingTeamBattleFieldEntry
  ) {
    return <View></View>;
  }

  return (
    <View>
      <StyledHeaderWrapper>
        <Text type="head4" fontWeight="600" text="팀원으로 신청했어요" />
      </StyledHeaderWrapper>
      <FlatList
        scrollEnabled={false}
        data={teamFieldEntryData?.pages.map(page => page.battleEntries).flat()}
        keyExtractor={(item, idx) => `application-${item.fieldType}-${idx}`}
        renderItem={({item}) => (
          <MyMatchListItem
            fieldId={item.fieldId}
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
              text="신청 내역이 존재하지 않습니다."
            />
          </StyledNonDataWrapper>
        )}
      />
      {(hasNextPageTeamFieldEntry ?? false) &&
        !isFetchingNextPageTeamFieldEntry && (
          <StyledMoreWrapper
            activeOpacity={0.8}
            onPress={() => fetchNextPageTeamFieldEntry}>
            <Text type="body2" fontWeight="400" text="더보기" />
          </StyledMoreWrapper>
        )}
      <Gap size="10px" />
      <Line size="sm" />

      <StyledHeaderWrapper>
        <Text type="head4" fontWeight="600" text="1vs1을 신청했어요" />
      </StyledHeaderWrapper>
      <FlatList
        scrollEnabled={false}
        data={duelFieldEntryData?.pages.map(page => page.battleEntries).flat()}
        keyExtractor={(item, idx) => `application-${item.fieldType}-${idx}`}
        renderItem={({item}) => (
          <MyMatchListItem
            fieldId={item.fieldId}
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
              text="신청 내역이 존재하지 않습니다."
            />
          </StyledNonDataWrapper>
        )}
      />
      {(hasNextPageDuelFieldEntry ?? false) &&
        !isFetchingNextPageDuelFieldEntry && (
          <StyledMoreWrapper
            activeOpacity={0.8}
            onPress={() => fetchNextPageDuelFieldEntry}>
            <Text type="body2" fontWeight="400" text="더보기" />
          </StyledMoreWrapper>
        )}
      <Gap size="10px" />
      <Line size="sm" />

      <StyledHeaderWrapper>
        <Text type="head4" fontWeight="600" text="팀 매칭을 신청했어요" />
      </StyledHeaderWrapper>
      <FlatList
        scrollEnabled={false}
        data={teamBattleFieldEntryData?.pages
          .map(page => page.battleEntries)
          .flat()}
        keyExtractor={(item, idx) => `application-${item.fieldType}-${idx}`}
        renderItem={({item}) => (
          <MyMatchListItem
            fieldId={item.fieldId}
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
              text="신청 내역이 존재하지 않습니다."
            />
          </StyledNonDataWrapper>
        )}
      />
      {(hasNextPageTeamBattleFieldEntry ?? false) &&
        !isFetchingNextPageTeamBattleFieldEntry && (
          <StyledMoreWrapper
            activeOpacity={0.8}
            onPress={() => fetchNextPageTeamBattleFieldEntry}>
            <Text type="body2" fontWeight="400" text="더보기" />
          </StyledMoreWrapper>
        )}
      <Gap size="10px" />
    </View>
  );
};

const StyledHeaderWrapper = styled.View`
  padding: 18px 16px;
`;

const StyledMoreWrapper = styled.TouchableOpacity`
  margin: 22px auto 20px auto;
`;

const StyledNonDataWrapper = styled.View`
  text-align: center;
  margin: 30px auto 40px auto;
`;
