import React, {useState} from 'react';

import styled from '@emotion/native';
import {useRoute, type RouteProp} from '@react-navigation/native';
import {SafeAreaView, ScrollView} from 'react-native';

import {theme} from '../../../../assets/styles/theme';
import {Gap} from '../../../../components/Gap';
import {Line} from '../../../../components/Line';
import {Text} from '../../../../components/Text';
import {WeeklyCalendar} from '../../../../components/WeeklyCalendar';
import {
  MatchDetailRecordSummary,
  MatchDetailRecordSummaryRanking,
} from '../../../../features/match/components/MatchDetailRecord';
import {useGetFieldDetailRatingSummary} from '../../../../features/match/hooks/field/useGetFieldDetailRatingSummary';
import {dayjs} from '../../../../lib/dayjs';
import {type MatchStackParamList} from '../../../../navigators';

export const MatchDetailRecordSummaryScreen = (): React.JSX.Element => {
  const route =
    useRoute<RouteProp<MatchStackParamList, 'MatchDetailRecordSummary'>>();
  const {date, fieldSide, id} = route.params;

  const [selectedDate, setSelectedDate] = useState(dayjs(date));

  const {data: recordSummaryData} = useGetFieldDetailRatingSummary({
    id,
    date: selectedDate.format('YYYY-MM-DD'),
    fieldSide,
  });

  return (
    <SafeAreaView style={{backgroundColor: theme.palette['gray-0'], flex: 1}}>
      <ScrollView>
        <StyledContentWrapper>
          <Text
            type="head4"
            text={fieldSide === 'HOME' ? '하루 요약' : '상대방 진행 현황'}
          />
          <Gap size="36px" />
          <WeeklyCalendar
            selectedDate={selectedDate}
            onChangeSelectedDate={setSelectedDate}
          />
          <Gap size="30px" />
          <MatchDetailRecordSummary
            totalExerciseTimeMinute={recordSummaryData?.totalExerciseTimeMinute}
            totalBurnedCalorie={recordSummaryData?.totalBurnedCalorie}
            totalRecordCount={recordSummaryData?.totalRecordCount}
            goalAchievedCount={recordSummaryData?.goalAchievedCount}
            winStatus={recordSummaryData?.winStatus}
          />
        </StyledContentWrapper>
        <Line size="lg" />
        <StyledContentWrapper>
          <Text type="head4" text="매칭 랭킹" />
          <MatchDetailRecordSummaryRanking
            id={id}
            selectedDate={selectedDate}
            fieldSide={fieldSide}
          />
        </StyledContentWrapper>
      </ScrollView>
    </SafeAreaView>
  );
};

const StyledContentWrapper = styled.ScrollView`
  padding: 25px 16px;
`;
