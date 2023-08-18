import React from 'react';

import styled from '@emotion/native';

import {Text} from '../Text';

export interface IRankingItemProps {
  image?: string;
  ranking: number;
  info: string;
}

const StyledRankingItem = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 10px 14px;
`;

const StyledProfile = styled.View`
  height: 40px;
  width: 40px;
  border-radius: 20px;
  margin: 0 16px 0 14px;
  background-color: ${props => props.theme.palette['gray-400']};
`;

export const RankingItem = ({
  image,
  ranking,
  info,
}: IRankingItemProps): React.JSX.Element => {
  return (
    <StyledRankingItem>
      <Text
        type="body2"
        color="main-300"
        fontWeight="600"
        text={ranking.toString()}
      />
      <StyledProfile />
      <Text type="body2" color="black" fontWeight="600" text={info} />
    </StyledRankingItem>
  );
};
