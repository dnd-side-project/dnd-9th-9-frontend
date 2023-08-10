import React from 'react';
import styled from '@emotion/native';
import {Text} from '../Text';
import {Icon} from '../Icon';
import {arrowRightXmlData} from '../../assets/svg';
import {Tpalette} from '../../assets/styles/emotion';

export interface INavigateButtonProps {
  text: string;
  width?: string;
  color?: Tpalette;
  backgroundColor?: Tpalette;
  onPress: () => void;
}

interface IStyledNavigateButton {
  width: string;
  color: Tpalette;
  backgroundColor: Tpalette;
}

const StyledNavigateButton = styled.TouchableOpacity<IStyledNavigateButton>`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  color: ${props => props.theme.palette[props.color]};
  background-color: ${props => props.theme.palette[props.backgroundColor]};
  border-radius: ${props => props.theme.borderRadius.md};
  width: ${props => props.width};
  padding: 17px 24px;
`;

export const NavigateButton = ({
  text,
  width = '300px',
  color = 'black',
  backgroundColor = 'gray-50',
  onPress,
}: INavigateButtonProps) => {
  return (
    <StyledNavigateButton
      width={width}
      color={color}
      backgroundColor={backgroundColor}
      onPress={onPress}
      activeOpacity={0.8}>
      <Text type="body2" color="black" fontWeight="600" text={text} />
      <Icon svgXml={arrowRightXmlData} width={44} height={44} />
    </StyledNavigateButton>
  );
};
