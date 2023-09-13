import React, {useCallback} from 'react';

import styled from '@emotion/native';

import {type theme} from '../../../../../assets/styles/theme';
import {Text} from '../../../../../components/Text';

interface IValidateGraph {
  passwordLength: number;
}

type TLevel = 'low' | 'medium' | 'high';

export const ValidateGraph = ({
  passwordLength = 0,
}: IValidateGraph): React.JSX.Element => {
  const getLevel = useCallback((length: number): TLevel => {
    if (length <= 7) {
      return 'low';
    } else if (length <= 11) {
      return 'medium';
    } else {
      return 'high';
    }
  }, []);

  const levels: Record<
    TLevel,
    {label: string; color: keyof typeof theme.palette; ratio: number}
  > = {
    low: {
      label: '짧아요',
      color: 'error-light',
      ratio: 0.25,
    },
    medium: {
      label: '좋음',
      color: 'main-300',
      ratio: 0.75,
    },
    high: {
      label: '아주 좋음',
      color: 'blue-400',
      ratio: 1,
    },
  };

  const {label, color, ratio} = levels[getLevel(passwordLength)];

  return (
    <StyledGraphContainer>
      <StyledGraphBackDrop>
        <StyledGraph color={color} ratio={ratio} />
      </StyledGraphBackDrop>
      <Text text={label} color={color} type="caption" />
    </StyledGraphContainer>
  );
};

const StyledGraphContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;

const StyledGraphBackDrop = styled.View`
  width: 100px;
  height: 4px;
  border-radius: 2px;
  background-color: ${({theme}) => theme.palette['gray-300']};
`;

const StyledGraph = styled.View<{
  color: keyof typeof theme.palette;
  ratio: number;
}>`
  width: ${({ratio}) => `${ratio * 100}%`};
  height: 4px;
  border-radius: 2px;
  background-color: ${({theme, color}) => theme.palette[color]};
`;
