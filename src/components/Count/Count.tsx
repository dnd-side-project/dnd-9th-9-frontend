import React from 'react';

import styled from '@emotion/native';

import {theme} from '../../assets/styles/theme';
import {minusXmlData, plusXmlData} from '../../assets/svg';
import {Icon} from '../Icon';
import {Text} from '../Text';

interface ICountProps {
  count: number;
  disabled: boolean;
  minusDisabled: boolean;
  plusDisabled: boolean;
  handleMinus: () => void;
  handlePlus: () => void;
}

interface IStyledCountButton {
  disabled: boolean;
}

export const Count = ({
  count,
  disabled,
  minusDisabled,
  plusDisabled,
  handleMinus,
  handlePlus,
}: ICountProps): React.JSX.Element => {
  const getButtonColor = (disabled: boolean): string =>
    disabled ? theme.palette['gray-400'] : theme.palette['gray-0'];

  return (
    <StyledCountWrapper>
      <StyledCountButton disabled={minusDisabled} onPress={handleMinus}>
        <Icon
          svgXml={minusXmlData}
          width={24}
          height={24}
          color={getButtonColor(minusDisabled)}
        />
      </StyledCountButton>

      <Text
        type="head2"
        fontWeight="400"
        color={disabled ? 'gray-400' : 'gray-950'}
        text={count.toString()}
      />

      <StyledCountButton disabled={plusDisabled} onPress={handlePlus}>
        <Icon
          svgXml={plusXmlData}
          width={24}
          height={24}
          color={getButtonColor(plusDisabled)}
        />
      </StyledCountButton>
    </StyledCountWrapper>
  );
};

const StyledCountWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 65px;
`;

const StyledCountButton = styled.TouchableOpacity<IStyledCountButton>`
  padding: 12px;
  width: 48px;
  height: 48px;
  border-radius: 100px;
  background-color: ${props =>
    props.disabled
      ? props.theme.palette['gray-200']
      : props.theme.palette['gray-700']};
`;
