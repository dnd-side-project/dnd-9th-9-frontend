import React from 'react';

import styled from '@emotion/native';

import {type TPalette} from '../../assets/styles/emotion';
import {theme} from '../../assets/styles/theme';
import {arrowRightXmlData} from '../../assets/svg';
import {Icon} from '../Icon';
import {Text} from '../Text';

export interface INavigateButtonProps {
  text: string;
  width?: string;
  color?: TPalette;
  backgroundColor?: TPalette;
  onPress: () => void;
}

interface IStyledNavigateButton {
  width: string;
  color: TPalette;
  backgroundColor: TPalette;
}

export const NavigateButton = ({
  text,
  width = '300px',
  color = 'black',
  backgroundColor = 'gray-50',
  onPress,
}: INavigateButtonProps): React.JSX.Element => {
  return (
    <StyledNavigateButton
      width={width}
      color={color}
      backgroundColor={backgroundColor}
      onPress={onPress}
      activeOpacity={0.8}>
      <Text type="body2" color={color} fontWeight="600" text={text} />
      <Icon
        svgXml={arrowRightXmlData}
        color={theme.palette[color]}
        width={44}
        height={44}
      />
    </StyledNavigateButton>
  );
};

const StyledNavigateButton = styled.TouchableOpacity<IStyledNavigateButton>`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: ${props => props.theme.palette[props.backgroundColor]};
  border-radius: ${props => props.theme.borderRadius.md};
  width: ${props => props.width};
  padding: 17px 24px;
  margin-right: 16px;
`;
