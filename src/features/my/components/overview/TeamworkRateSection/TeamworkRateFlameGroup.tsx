import React from 'react';

import styled from '@emotion/native';

import {theme} from '../../../../../assets/styles/theme';
import {fireScoreXmlData} from '../../../../../assets/svg';
import {Icon} from '../../../../../components/Icon';
import {getFlameData} from '../../../const';

interface TeamworkRateFlameGroupProps {
  rate: number;
}

export const TeamworkRateFlameGroup = ({
  rate,
}: TeamworkRateFlameGroupProps): React.JSX.Element => {
  const {color} = getFlameData(rate);

  return (
    <StyledHorizontal style={{gap: 8}}>
      {Array.from({length: 5}, (_, index) => (
        <Icon
          key={index}
          svgXml={fireScoreXmlData}
          height={48}
          width={48}
          color={index < rate ? color : theme.palette['gray-400']}
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
