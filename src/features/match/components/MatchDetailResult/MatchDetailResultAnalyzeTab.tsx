import React from 'react';

import {MatchDetailResultAnalyzeTabItem} from './MatchDetailResultAnalyzeTabItem';
import {DynamicTab} from '../../../../components/Tab';
import {type TWinStatus} from '../../types';

interface IMatchDetailResultAnalyzeTabProps {
  ourTeamName: string;
  awayTeamName: string;
  elementWiseWin: {
    burnedCalorie: TWinStatus;
    exerciseTimeMinute: TWinStatus;
    goalAchievedCount: TWinStatus;
    recordCount: TWinStatus;
  };
}

export const MatchDetailResultAnalyzeTab = ({
  ourTeamName,
  awayTeamName,
  elementWiseWin,
}: IMatchDetailResultAnalyzeTabProps): React.JSX.Element => {
  const resultMessage = {
    WIN: `${ourTeamName}팀의 승리!`,
    DRAW: '무승부!',
    LOSE: `${awayTeamName}팀의 승리!`,
  };

  const tabs = [
    {
      title: '운동시간',
      tabContent: () => (
        <MatchDetailResultAnalyzeTabItem
          subject="운동시간을"
          message={resultMessage[elementWiseWin.exerciseTimeMinute]}
        />
      ),
    },
    {
      title: '소모 칼로리',
      tabContent: () => (
        <MatchDetailResultAnalyzeTabItem
          subject="소모 칼로리를"
          message={resultMessage[elementWiseWin.burnedCalorie]}
        />
      ),
    },
    {
      title: '기록 횟수',
      tabContent: () => (
        <MatchDetailResultAnalyzeTabItem
          subject="기록 횟수를"
          message={resultMessage[elementWiseWin.recordCount]}
        />
      ),
    },
    {
      title: '활동링 달성',
      tabContent: () => (
        <MatchDetailResultAnalyzeTabItem
          subject="활동링 달성을"
          message={resultMessage[elementWiseWin.goalAchievedCount]}
        />
      ),
    },
  ];
  return <DynamicTab tabs={tabs} />;
};
