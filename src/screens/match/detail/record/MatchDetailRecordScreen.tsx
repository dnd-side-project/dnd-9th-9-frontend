import React, {useState} from 'react';

import styled from '@emotion/native';
import {SafeAreaView, ScrollView, View} from 'react-native';

import {theme} from '../../../../assets/styles/theme';
import {NavigateButton} from '../../../../components/Button';
import {Gap} from '../../../../components/Gap';
import {Line} from '../../../../components/Line';
import {WeeklyCalendar} from '../../../../components/WeeklyCalendar';
import {MatchDetailRecordCard} from '../../../../features/match/components/MatchDetailRecord';
import {MatchDetailRecordCarousel} from '../../../../features/match/components/MatchDetailRecord/MatchDetailRecordCarousel';
import {
  useGetFieldRecord,
  DUMMY_DATA,
} from '../../../../features/match/hooks/field/useGetFieldRecord';
import {dayjs} from '../../../../lib/dayjs';

interface IMatchDetailRecordScreenProps {
  id?: number;
}

export const MatchDetailRecordScreen = ({
  id = undefined,
}: IMatchDetailRecordScreenProps): React.JSX.Element => {
  // TODO: 오류 화면 (서버, 404 등... 앱에서도 필요한가?) 디자인 시스템 요청드리기
  if (id === undefined) return <View></View>;

  const [selectedDate, setSelectedDate] = useState(dayjs());

  const {data = DUMMY_DATA} = useGetFieldRecord({
    id,
    date: selectedDate.format('YYYY-MM-DD HH:MM:SS'),
    fieldType: 'DUEL',
  });

  // TODO: 추후 수정
  const carouselData = [
    '🔥 현재 우리팀이 [name]보다 앞서나가는 중!',
    '🔥 목표 D-10 일 조금만 더 힘내 보아요!',
    '🔥 팀 규칙 : 하루에 1인당 500kcal 태우기!',
  ];

  return (
    <SafeAreaView style={{backgroundColor: theme.palette['gray-0'], flex: 1}}>
      <ScrollView>
        <StyledButtonWrapper horizontal showsHorizontalScrollIndicator={false}>
          <NavigateButton text="하루 요약" onPress={() => {}} />
          <NavigateButton text="상대 팀 진행 현황" onPress={() => {}} />
        </StyledButtonWrapper>

        <Line size="lg" />
        <Gap size="36px" />

        <WeeklyCalendar
          selectedDate={selectedDate}
          onChangeSelectedDate={setSelectedDate}
        />

        <Gap size="15px" />
        <MatchDetailRecordCarousel data={carouselData} />
        <Gap size="24px" />

        <MatchDetailRecordCard records={data} />
      </ScrollView>
    </SafeAreaView>
  );
};

const StyledButtonWrapper = styled.ScrollView`
  flex-direction: row;
  padding: 30px 16px;
`;
