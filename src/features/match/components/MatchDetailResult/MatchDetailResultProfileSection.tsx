import React from 'react';

import styled from '@emotion/native';

import {Gap} from '../../../../components/Gap';
import {Text} from '../../../../components/Text';

interface IMatchDetailResultProfileSectionProps {
  ourTeamImage: string;
  awayTeamImage: string;
  ourTeamName: string;
  awayTeamName: string;
  ourScore: number;
  awayScore: number;
}

export const MatchDetailResultProfileSection = ({
  ourTeamImage,
  awayTeamImage,
  ourTeamName,
  awayTeamName,
  ourScore,
  awayScore,
}: IMatchDetailResultProfileSectionProps): React.JSX.Element => {
  return (
    <StyledProfileSectionWrapper>
      <StyledUserInfo>
        <StyledUserProfileImage source={ourTeamImage} />
        <Gap size="8px" />
        <Text
          type="body2"
          fontWeight="600"
          textAlign="center"
          text={ourTeamName}
        />
        <Gap size="8px" />
        <Text
          type="head4"
          color="gray-0"
          fontWeight="700"
          textAlign="center"
          text={ourScore.toString()}
        />
      </StyledUserInfo>
      <Text
        type="head4"
        color="gray-0"
        fontWeight="600"
        textAlign="center"
        text=":"
      />
      <StyledUserInfo>
        <StyledUserProfileImage source={awayTeamImage} />
        <Gap size="8px" />
        <Text
          type="body2"
          fontWeight="600"
          textAlign="center"
          text={awayTeamName}
        />
        <Gap size="8px" />
        <Text
          type="head4"
          color="gray-0"
          fontWeight="700"
          textAlign="center"
          text={awayScore.toString()}
        />
      </StyledUserInfo>
    </StyledProfileSectionWrapper>
  );
};

const StyledProfileSectionWrapper = styled.View`
  flex-direction: row;
  height: 229px;
  align-items: center;
  justify-content: center;
  border-top-left-radius: ${props => props.theme.borderRadius.md};
  border-top-right-radius: ${props => props.theme.borderRadius.md};
  background-color: ${props => props.theme.palette['main-300']};
`;

const StyledUserProfileImage = styled.Image`
  width: 100px;
  height: 100px;
  margin: auto;
  background-color: ${props => props.theme.palette['gray-100']};
  border-radius: 107.692px;
`;

const StyledUserInfo = styled.View`
  width: 50%;
`;
