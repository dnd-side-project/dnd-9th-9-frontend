import React from 'react';
import styled from '@emotion/native';
import {RankingItem} from './RankingItem';

interface IRankingProps {
  infos: string[];
}

const StyledRanking = styled.View``;

export const Ranking = ({infos}: IRankingProps) => {
  return (
    <StyledRanking>
      {infos.map((info, index) => (
        <RankingItem key={`${info}-${index}`} ranking={index + 1} info={info} />
      ))}
    </StyledRanking>
  );
};
