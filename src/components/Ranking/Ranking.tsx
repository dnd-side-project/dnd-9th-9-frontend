import React from 'react';

import styled from '@emotion/native';
import {View} from 'react-native';

import {RankingItem} from './RankingItem';
import {Text} from '../Text';

interface IRankingProps {
  infos: string[];
}

export const Ranking = ({infos}: IRankingProps): React.JSX.Element => {
  return (
    <View>
      {infos.length > 0 ? (
        infos.map((info, index) => (
          <RankingItem
            key={`${info}-${index}`}
            ranking={index + 1}
            info={info}
          />
        ))
      ) : (
        <StyledNoContentsWrapper>
          <Text
            type="body2"
            textAlign="center"
            color="gray-400"
            fontWeight="600"
            text="기록이 존재하지 않습니다."
          />
        </StyledNoContentsWrapper>
      )}
    </View>
  );
};

const StyledNoContentsWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  min-height: 120px;
  margin: 0px auto 30px auto;
`;
