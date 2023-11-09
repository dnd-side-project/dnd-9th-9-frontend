import React from 'react';

import styled from '@emotion/native';

import {MatchDetailRateSection} from './MatchDetailRateSection';
import {MatchDetailResultProfileSection} from './MatchDetailResultProfileSection';
import {type TWinStatus, type TPeriod} from '../../types';

interface IMatchDetailResultRateCardProps {
  ourTeamImage: string;
  awayTeamImage: string;
  ourTeamName: string;
  awayTeamName: string;
  ourScore: number;
  awayScore: number;
  period: TPeriod;
  winStatus: TWinStatus;
  currentRate: number;
  onPressRate: (value: number) => void;
}

export const MatchDetailResultRateCard = ({
  ourTeamImage,
  awayTeamImage,
  ourTeamName,
  awayTeamName,
  ourScore,
  awayScore,
  period,
  winStatus,
  currentRate,
  onPressRate,
}: IMatchDetailResultRateCardProps): React.JSX.Element => {
  const resultTitle = {
    DRAW: '무승부!',
    LOSE: `${awayTeamName} 팀 승리!`,
    WIN: `${ourTeamName} 팀 승리!`,
  };

  return (
    <StyledCardWrapper>
      <MatchDetailResultProfileSection
        ourTeamImage={ourTeamImage}
        awayTeamImage={awayTeamImage}
        ourTeamName={ourTeamName}
        awayTeamName={awayTeamName}
        ourScore={ourScore}
        awayScore={awayScore}
      />
      <MatchDetailRateSection
        period={period}
        resultTitle={resultTitle[winStatus]}
        currentRate={currentRate}
        onPressRate={onPressRate}
      />
    </StyledCardWrapper>
  );
};

const StyledCardWrapper = styled.View`
  margin-left: 16px;
  margin-right: 16px;
`;
