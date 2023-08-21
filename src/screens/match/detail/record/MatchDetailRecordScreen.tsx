import React from 'react';

import styled from '@emotion/native';
import {type NativeStackScreenProps} from '@react-navigation/native-stack';
import {SafeAreaView, ScrollView} from 'react-native';

import {theme} from '../../../../assets/styles/theme';
import {NavigateButton} from '../../../../components/Button';
import {Gap} from '../../../../components/Gap';
import {Line} from '../../../../components/Line';
// import {Text} from '../../../../components/Text';
import {WeeklyCalendar} from '../../../../components/WeeklyCalendar';
import {MatchDetailRecordCardItem} from '../../../../features/match/components/MatchDetailRecord';
import {type MatchStackParamList} from '../../../../navigators/MatchNavigator';

type TMatchDetailRecordScreenProps = NativeStackScreenProps<
  MatchStackParamList,
  'MatchDetailRecord'
>;

export const MatchDetailRecordScreen = ({
  navigation,
}: TMatchDetailRecordScreenProps): React.JSX.Element => {
  return (
    <SafeAreaView style={{backgroundColor: theme.palette['gray-0']}}>
      <ScrollView>
        <StyledButtonWrapper horizontal showsHorizontalScrollIndicator={false}>
          <NavigateButton text="하루 요약" onPress={() => {}} />
          <NavigateButton text="상대 팀 진행 현황" onPress={() => {}} />
        </StyledButtonWrapper>

        <Line size="lg" />
        <Gap size="36px" />

        <WeeklyCalendar />

        <MatchDetailRecordCardItem />
        <MatchDetailRecordCardItem />
      </ScrollView>
    </SafeAreaView>
  );
};

const StyledButtonWrapper = styled.ScrollView`
  flex-direction: row;
  padding: 30px 16px;
`;
