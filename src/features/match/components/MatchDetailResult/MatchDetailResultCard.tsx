import React from 'react';

import styled from '@emotion/native';

import {MatchDetailResultProfileSection} from './MatchDetailResultProfileSection';
import {MatchDetailResultSection} from './MatchDetailResultSection';
import {type TWinStatus, type TPeriod} from '../../types';

interface IMatchDetailResultCardProps {
  ourTeamImage: string;
  awayTeamImage: string;
  ourTeamName: string;
  awayTeamName: string;
  ourScore: number;
  awayScore: number;
  period: TPeriod;
  winStatus: TWinStatus;
}

export const MatchDetailResultCard = ({
  ourTeamImage,
  awayTeamImage,
  ourTeamName,
  awayTeamName,
  ourScore,
  awayScore,
  period,
  winStatus,
}: IMatchDetailResultCardProps): React.JSX.Element => {
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
      <MatchDetailResultSection
        period={period}
        title={resultTitle[winStatus]}
      />
    </StyledCardWrapper>
  );
};

const StyledCardWrapper = styled.View`
  margin-left: 16px;
  margin-right: 16px;
`;
