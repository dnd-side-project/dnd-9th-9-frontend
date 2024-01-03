import React from 'react';

import styled from '@emotion/native';

import {theme} from '../../../../../assets/styles/theme';
import {fireScoreXmlData} from '../../../../../assets/svg';
import {Icon} from '../../../../../components/Icon';
import {getFlameData} from '../../../const';

const sizes = {
  sm: {
    iconSize: 23,
    gap: 2,
  },
  md: {
    iconSize: 48,
    gap: 8,
  },
} as const;

interface TeamworkRateFlameGroupProps {
  rate: number;
  size?: keyof typeof sizes;
  color?: string;
}

export const TeamworkRateFlameGroup = ({
  rate,
  size = 'md',
  color: customColor,
}: TeamworkRateFlameGroupProps): React.JSX.Element => {
  const {color} = getFlameData(rate);

  return (
    <StyledHorizontal style={{gap: sizes[size].gap}}>
      {Array.from({length: 5}, (_, index) => (
        <Icon
          key={index}
          svgXml={fireScoreXmlData}
          height={sizes[size].iconSize}
          width={sizes[size].iconSize}
          color={
            index < rate ? customColor ?? color : theme.palette['gray-400']
          }
        />
      ))}
    </StyledHorizontal>
  );
};

const StyledHorizontal = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
