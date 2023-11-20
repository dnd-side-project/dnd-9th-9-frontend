import React from 'react';

import {ScrollView} from 'react-native';

import {MyMatchApplicationScreen} from './MyMatchApplicationScreen';
import {MyMatchCompleteScreen} from './MyMatchCompleteScreen';
import {MyMatchProgressScreen} from './MyMatchProgressScreen';
import {MyMatchRecruitingScreen} from './MyMatchRecruitingScreen';
import {theme} from '../../../assets/styles/theme';
import {MyMatchStatusFilter} from '../../../features/match/components/MyMatch/MyMatchStatusFilter';
import {type TMyMatchStatus} from '../../../features/match/types';

interface IMyMatchListScreenProps {
  matchStatus: TMyMatchStatus;
}

export const MyMatchListScreen = ({
  matchStatus,
}: IMyMatchListScreenProps): React.JSX.Element => {
  const getMyMatchScreen = {
    APPLICATION: <MyMatchApplicationScreen />,
    RECRUITING: <MyMatchRecruitingScreen />,
    PROGRESS: <MyMatchProgressScreen />,
    COMPLETE: <MyMatchCompleteScreen />,
  };

  return (
    <ScrollView style={{flex: 1, backgroundColor: theme.palette['gray-0']}}>
      <MyMatchStatusFilter matchStatus={matchStatus} />
      {getMyMatchScreen[matchStatus]}
    </ScrollView>
  );
};
