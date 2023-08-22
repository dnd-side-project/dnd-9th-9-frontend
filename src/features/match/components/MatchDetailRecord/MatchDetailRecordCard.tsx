import React from 'react';

import styled from '@emotion/native';
import {useNavigation} from '@react-navigation/native';
import {type NativeStackNavigationProp} from '@react-navigation/native-stack';

import {MatchDetailRecordCardItem} from './MatchDetailRecordCardItem';
import {Text} from '../../../../components/Text';
import {type MatchStackParamList} from '../../../../navigators';
import {type IMatchDetailRecord} from '../../types';

interface IMatchDetailRecordCardProps {
  records: IMatchDetailRecord[];
}

export const MatchDetailRecordCard = ({
  records,
}: IMatchDetailRecordCardProps): React.JSX.Element => {
  const navigation =
    useNavigation<NativeStackNavigationProp<MatchStackParamList>>();

  const handleRecordDetail = (record: IMatchDetailRecord): void => {
    console.log('이동');
    navigation.navigate('MatchDetailRecordDetail', record);
  };

  return (
    <StyledCardWrapper>
      {records.map(record => (
        <MatchDetailRecordCardItem
          key={`record-${record.id}`}
          burnedCalorie={record.burnedCalorie}
          durationMinute={record.durationMinute}
          exerciseDateTime={record.exerciseDateTime}
          id={record.id}
          isLeader={record.isLeader}
          isMemoPublic={record.isMemoPublic}
          memoContent={record.memoContent}
          memoImg={record.memoImg}
          name={record.name}
          profileImg={record.profileImg}
          sports={record.sports}
          userId={record.userId}
          onPressCardItem={handleRecordDetail}
        />
      ))}

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
    </StyledCardWrapper>
  );
};

const StyledCardWrapper = styled.View``;

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
