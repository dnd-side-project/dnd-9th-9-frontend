import React, {useState} from 'react';

import styled from '@emotion/native';
import {View} from 'react-native';

import {Ranking} from '../../../../components/Ranking';
import {Text} from '../../../../components/Text';
import {type dayjs} from '../../../../lib/dayjs';
import {useGetFieldDetailTeamRanking} from '../../hooks/field/useGetFieldDetailTeamRanking';

type TRankingCategory = 'time' | 'kcal' | 'recordCount' | 'achieveCount';

interface IMatchDetailRecordSummaryRankingProps {
  id: number;
  selectedDate: dayjs.Dayjs;
  fieldSide: 'AWAY' | 'HOME';
}

interface ISummaryRankingTabItemProps {
  label: string;
  pickedType: TRankingCategory;
  type: TRankingCategory;
  onPress: (value: TRankingCategory) => void;
}

export const MatchDetailRecordSummaryRanking = ({
  id,
  selectedDate,
  fieldSide,
}: IMatchDetailRecordSummaryRankingProps): React.JSX.Element => {
  const {data: teamRankingData} = useGetFieldDetailTeamRanking({
    id,
    date: selectedDate.format('YYYY-MM-DD'),
    fieldSide,
  });

  const [pickedType, setPickedType] = useState<TRankingCategory>('time');

  const getRankingDataByPickedType = (): React.JSX.Element => {
    if (pickedType === 'time')
      return (
        <Ranking
          infos={
            teamRankingData?.exerciseTimeRanking?.map(
              item =>
                `${Math.floor(item?.value / 60)} 시간 ${item?.value % 60} 분`,
            ) ?? []
          }
        />
      );
    else if (pickedType === 'kcal')
      return (
        <Ranking
          infos={
            teamRankingData?.burnedCalorieRanking?.map(
              item => `${item?.value} kcal`,
            ) ?? []
          }
        />
      );
    else if (pickedType === 'recordCount')
      return (
        <Ranking
          infos={
            teamRankingData?.recordCountRanking?.map(
              item => `${item?.value} 회`,
            ) ?? []
          }
        />
      );
    else if (pickedType === 'achieveCount')
      return (
        <Ranking
          infos={
            teamRankingData?.goalAchievedCountRanking?.map(
              item => `${item?.value} 회`,
            ) ?? []
          }
        />
      );

    return <></>;
  };

  return (
    <View>
      <StyledTabWrapper>
        <SummaryRankingTabItem
          type="time"
          pickedType={pickedType}
          label="운동시간"
          onPress={(type: TRankingCategory) => {
            setPickedType(type);
          }}
        />
        <SummaryRankingTabItem
          type="kcal"
          pickedType={pickedType}
          label="소모 칼로리"
          onPress={(type: TRankingCategory) => {
            setPickedType(type);
          }}
        />
        <SummaryRankingTabItem
          type="recordCount"
          pickedType={pickedType}
          label="기록 횟수"
          onPress={(type: TRankingCategory) => {
            setPickedType(type);
          }}
        />
        <SummaryRankingTabItem
          type="achieveCount"
          pickedType={pickedType}
          label="활동링 달성"
          onPress={(type: TRankingCategory) => {
            setPickedType(type);
          }}
        />
      </StyledTabWrapper>
      {getRankingDataByPickedType()}
    </View>
  );
};

const SummaryRankingTabItem = ({
  label,
  pickedType,
  type,
  onPress,
}: ISummaryRankingTabItemProps): React.JSX.Element => {
  return (
    <StyledTabItem
      type={type}
      pickedType={pickedType}
      onPress={() => {
        onPress(type);
      }}>
      <Text
        type="body3"
        color={pickedType === type ? 'black' : 'gray-400'}
        fontWeight="600"
        text={label}
      />
    </StyledTabItem>
  );
};

const StyledTabWrapper = styled.View`
  flex-direction: row;
  justify-content: space-around;
  padding: 20px 0 10px 0;
  margin: 0 0 10px 0;
`;

const StyledTabItem = styled.TouchableOpacity<{
  type: TRankingCategory;
  pickedType: TRankingCategory;
}>`
  width: '25%';
  padding: 10px 5%;
  border-bottom-width: 2px;
  border-bottom-color: ${props =>
    props.type === props.pickedType
      ? props.theme.palette.black
      : props.theme.palette['gray-200']};
`;
