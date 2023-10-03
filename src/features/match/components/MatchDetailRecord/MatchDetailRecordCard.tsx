import React from 'react';

import styled from '@emotion/native';
import {useNavigation} from '@react-navigation/native';
import {type NativeStackNavigationProp} from '@react-navigation/native-stack';
import {type InfiniteData} from '@tanstack/react-query';
import {FlatList, View} from 'react-native';

import {MatchDetailRecordCardItem} from './MatchDetailRecordCardItem';
import {Text} from '../../../../components/Text';
import {type MatchStackParamList} from '../../../../navigators';
import {type IMatchDetailRecord} from '../../types';

interface IMatchDetailRecordCardProps {
  recordData?: InfiniteData<{
    currentPageNumber: number;
    currentPageSize: number;
    daysLeft: number;
    recordList: IMatchDetailRecord[];
    rule: string;
    totalCount: number;
    winStatus: 'DRAW' | 'LOSE' | 'WIN';
  }>;
  onEndReached?: () => void;
}

export const MatchDetailRecordCard = ({
  recordData,
  onEndReached,
}: IMatchDetailRecordCardProps): React.JSX.Element => {
  const navigation =
    useNavigation<NativeStackNavigationProp<MatchStackParamList>>();

  const handleRecordDetail = (record: IMatchDetailRecord): void => {
    navigation.navigate('MatchDetailRecordDetail', record);
  };

  return (
    <View>
      <FlatList
        scrollEnabled={false}
        data={recordData?.pages.map(page => page.recordList).flat()}
        keyExtractor={item => `match-record-${item.id}`}
        renderItem={({item}) => (
          <MatchDetailRecordCardItem
            burnedCalorie={item.burnedCalorie}
            durationMinute={item.durationMinute}
            exerciseDateTime={item.exerciseDateTime}
            id={item.id}
            isLeader={item.isLeader}
            isMemoPublic={item.isMemoPublic}
            memoContent={item.memoContent}
            memoImg={item.memoImg}
            name={item.name}
            profileImg={item.profileImg}
            sports={item.sports}
            userId={item.userId}
            onPressCardItem={() => {
              handleRecordDetail(item);
            }}
          />
        )}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.5}
      />

      <StyledNoContentWrapper>
        <Text
          type="body3"
          color="gray-600"
          fontWeight="600"
          text={`기록이 더 없어요.\n다른 팀원에게 같이 운동하자고 해볼까요?`}
          textAlign="center"
        />
        {/* TODO: 팀원 깨우기 기능 연동 */}
        <StyledWakeUpButton onPress={() => {}} activeOpacity={0.8}>
          <Text
            type="body2"
            color="gray-0"
            fontWeight="600"
            text="팀원 깨우기👈"
            textAlign="center"
          />
        </StyledWakeUpButton>
      </StyledNoContentWrapper>
    </View>
  );
};

const StyledNoContentWrapper = styled.View`
  margin: 60px 0 0 0;
  align-items: center;
  justify-content: center;
`;

const StyledWakeUpButton = styled.TouchableOpacity`
  width: 329px;
  margin: 14px 0px;
  padding: 15px 16px;
  border-radius: ${props => props.theme.borderRadius.md};
  background-color: ${props => props.theme.palette['gray-800']};
`;
