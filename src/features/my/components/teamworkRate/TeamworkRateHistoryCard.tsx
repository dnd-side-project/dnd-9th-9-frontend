import React, {useCallback} from 'react';

import styled from '@emotion/native';

import {type TPalette} from '../../../../assets/styles/emotion';
import {theme} from '../../../../assets/styles/theme';
import {Text} from '../../../../components/Text';
import {type TPeriod, type TWinStatus} from '../../../match/types';
import {type ITeamworkRateHistory} from '../../types';
import {TeamworkRateFlameGroup} from '../overview/TeamworkRateSection/TeamworkRateFlameGroup';

interface ITeamworkRateHistoryCardProps {
  teamworkRateHistory: ITeamworkRateHistory;
}

export const TeamworkRateHistoryCard = ({
  teamworkRateHistory,
}: ITeamworkRateHistoryCardProps): React.JSX.Element => {
  const generateMatchText = useCallback(
    (
      matchInfo: ITeamworkRateHistory,
    ): {
      title: string;
      descriptionComponent: () => React.JSX.Element;
    } => {
      const {fieldType, myFieldName, opponentName, period} = matchInfo;
      const weekLabels: Record<TPeriod, string> = {
        ONE_WEEK: '한 주',
        TWO_WEEKS: '두 주',
        THREE_WEEKS: '세 주',
      };

      switch (fieldType) {
        case 'TEAM_BATTLE':
          return {
            title: '팀매칭',
            descriptionComponent: () => (
              <StyledHorizontal style={{gap: 8, height: 48}}>
                <Text text={myFieldName} fontWeight="700" color="gray-700" />
                <Text text="팀에서" color="gray-700" />
                <Text text={opponentName} fontWeight="700" color="gray-700" />
                <Text text="팀과" color="gray-700" />
                <Text text="팀 매칭!" fontWeight="700" color="gray-700" />
              </StyledHorizontal>
            ),
          };
        case 'DUEL':
          return {
            title: '1:1 매칭',
            descriptionComponent: () => (
              <StyledHorizontal style={{gap: 8, height: 48}}>
                <Text text={opponentName} fontWeight="700" color="gray-700" />
                <Text text="님과" color="gray-700" />
                <Text text="1:1 매칭!" fontWeight="700" color="gray-700" />
              </StyledHorizontal>
            ),
          };

        case 'TEAM':
          return {
            title: '매칭없는 팀',
            descriptionComponent: () => (
              <StyledHorizontal style={{gap: 8, height: 48}}>
                <Text text={myFieldName} fontWeight="700" color="gray-700" />
                <Text text="팀에서" color="gray-700" />
                <Text
                  text={`${weekLabels[period]}동안 활동`}
                  fontWeight="700"
                  color="gray-700"
                />
              </StyledHorizontal>
            ),
          };
        default:
          return {title: '', descriptionComponent: () => <></>};
      }
    },
    [],
  );

  const capitalizeFirstLetter = (str: string): string => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  const statusColor: Record<TWinStatus, TPalette> = {
    DRAW: 'gray-600',
    WIN: 'main-400',
    LOSE: 'sub-400',
  };

  const {title, descriptionComponent: Description} =
    generateMatchText(teamworkRateHistory);

  return (
    <StyledTeamworkRateHistoryCard>
      <StyledHorizontal style={{justifyContent: 'space-between'}}>
        <Text type="body1" text={title} fontWeight="700" color="gray-700" />
        {teamworkRateHistory.fieldType !== 'TEAM' && (
          <Text
            type="body1"
            text={capitalizeFirstLetter(teamworkRateHistory.winStatus)}
            fontWeight="700"
            color={statusColor[teamworkRateHistory.winStatus]}
          />
        )}
      </StyledHorizontal>

      <Description />

      <StyledHorizontal style={{justifyContent: 'flex-end'}}>
        <TeamworkRateFlameGroup
          size="sm"
          rate={teamworkRateHistory.teamworkRate}
          color={theme.palette['main-400']}
        />
      </StyledHorizontal>
    </StyledTeamworkRateHistoryCard>
  );
};

const StyledTeamworkRateHistoryCard = styled.View`
  background-color: ${({theme}) => theme.palette['gray-50']};
  padding: 18px 20px;
  border-radius: ${({theme}) => theme.borderRadius.lg};
`;

const StyledHorizontal = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
