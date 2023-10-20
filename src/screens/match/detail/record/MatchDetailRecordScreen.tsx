import React, {useMemo, useState} from 'react';

import styled from '@emotion/native';
import {useNavigation} from '@react-navigation/native';
import {type NativeStackNavigationProp} from '@react-navigation/native-stack';
import {SafeAreaView, ScrollView} from 'react-native';
import Toast from 'react-native-simple-toast';

import {theme} from '../../../../assets/styles/theme';
import {NavigateButton} from '../../../../components/Button';
import {Gap} from '../../../../components/Gap';
import {Line} from '../../../../components/Line';
import {Text} from '../../../../components/Text';
import {WeeklyCalendar} from '../../../../components/WeeklyCalendar';
import {MatchDetailRecordCard} from '../../../../features/match/components/MatchDetailRecord';
import {MatchDetailRecordCarousel} from '../../../../features/match/components/MatchDetailRecord/MatchDetailRecordCarousel';
import {WinStatus} from '../../../../features/match/const';
import {useGetInfiniteFieldRecord} from '../../../../features/match/hooks/field/useGetInfiniteFieldRecord';
import {type IField, type TFieldType} from '../../../../features/match/types';
import {dayjs} from '../../../../lib/dayjs';
import {type MatchStackParamList} from '../../../../navigators';

interface IMatchDetailRecordScreenProps {
  id: number;
  fieldStatus: 'COMPLETED' | 'IN_PROGRESS' | 'RECRUITING';
  assignedField: IField;
  fieldType: TFieldType;
}

export const MatchDetailRecordScreen = ({
  id,
  fieldStatus,
  assignedField,
  fieldType,
}: IMatchDetailRecordScreenProps): React.JSX.Element => {
  const navigation =
    useNavigation<NativeStackNavigationProp<MatchStackParamList>>();

  const [selectedDate, setSelectedDate] = useState(dayjs());

  // TODO (@chajuhui123): date format 재문의 'YYYY-MM-DD HH:MM:SS' 형태일때 오류
  const {
    data: recordData,
    refetch: refetchRecord,
    isFetching: isFetchingRecord,
    hasNextPage: hasNextPageRecord,
  } = useGetInfiniteFieldRecord({
    id,
    date: selectedDate.format('YYYY-MM-DD'),
    fieldType,
    page: 0,
    size: 3,
  });

  const winStatusMessage =
    WinStatus[recordData?.pages[0]?.winStatus ?? 'DEFAULT'];
  const leftDateMessage = recordData?.pages[0]?.daysLeft;
  const ruleMessage = recordData?.pages[0]?.rule;

  const carouselMessage = useMemo(() => {
    const message = [];

    message.push(winStatusMessage);

    if (leftDateMessage != null)
      message.push(`🔥 목표 D-${leftDateMessage}일 조금만 더 힘내보아요!`);

    if (ruleMessage != null) message.push(`🔥 팀 규칙 : ${ruleMessage}`);

    return message;
  }, [winStatusMessage, leftDateMessage, ruleMessage]);

  const handleTodaySummary = (type: 'MY' | 'ASSIGN'): void => {
    if (fieldStatus === 'RECRUITING') {
      Toast.show('매칭을 먼저 시작해주세요.', Toast.SHORT, {
        backgroundColor: '#000000c5',
      });
      return;
    }
    if (type === 'MY') {
      navigation.navigate('MatchDetailRecordSummary', {
        date: selectedDate.format('YYYY-MM-DD'),
        fieldSide: 'HOME',
        id,
      });
    } else {
      navigation.navigate('MatchDetailRecordSummary', {
        date: selectedDate.format('YYYY-MM-DD'),
        fieldSide: 'AWAY',
        id,
      });
    }
  };

  return (
    <SafeAreaView style={{backgroundColor: theme.palette['gray-0'], flex: 1}}>
      <ScrollView>
        {fieldType !== 'DUEL' && fieldStatus !== 'COMPLETED' && (
          <>
            <StyledButtonWrapper
              horizontal
              showsHorizontalScrollIndicator={false}>
              <NavigateButton
                backgroundColor={
                  fieldStatus === 'RECRUITING' ? 'gray-300' : 'main-400'
                }
                color="gray-0"
                text="하루 요약 ✏️"
                onPress={() => {
                  handleTodaySummary('MY');
                }}
              />
              <NavigateButton
                backgroundColor={
                  fieldStatus === 'RECRUITING' ? 'gray-300' : 'sub-400'
                }
                color="gray-0"
                text="상대 팀 진행 현황 💪"
                onPress={() => {
                  handleTodaySummary('ASSIGN');
                }}
              />
            </StyledButtonWrapper>
            <Line size="lg" />
          </>
        )}

        <Gap size="36px" />

        <WeeklyCalendar
          selectedDate={selectedDate}
          onChangeSelectedDate={setSelectedDate}
        />

        {fieldStatus === 'RECRUITING' ? (
          <StyledNoContentsWrapper>
            <Text
              type="body2"
              textAlign="center"
              color="gray-400"
              fontWeight="600"
              text={`현재 매칭이 시작되지 않아\n기록이 존재하지 않습니다.`}
            />
          </StyledNoContentsWrapper>
        ) : (
          <>
            <MatchDetailRecordCarousel data={carouselMessage} />
            <Gap size="24px" />
            <MatchDetailRecordCard
              recordData={recordData}
              onEndReached={() => {
                if ((hasNextPageRecord ?? false) && !isFetchingRecord) {
                  void refetchRecord();
                }
              }}
            />
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const StyledButtonWrapper = styled.ScrollView`
  flex-direction: row;
  padding: 30px 16px;
`;

const StyledNoContentsWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  min-height: 120px;
  margin: 0px auto 30px auto;
`;
