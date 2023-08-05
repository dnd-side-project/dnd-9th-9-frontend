import React from 'react';
import styled from '@emotion/native';
import {Text} from '../Text';

export interface IButtonProps {
  disabled?: boolean;
  text: string;
  size?: 'sm' | 'md' | 'lg';
  style?: any;
  onPress: () => void;
}

interface IStyledButton {
  disabled: boolean;
  style?: any;
}

const buttonSizes = {
  sm: '56px',
  md: '72px',
  lg: '96px',
};

const StyledButton = styled.TouchableOpacity<IStyledButton>`
  background: ${props =>
    props.disabled
      ? props.theme.palette['gray-200']
      : props.theme.palette['main-300']};

  ${props => props.style}
`;

export const Button = (
  {text, size = 'sm', onPress, disabled = false, style}: IButtonProps,
  props: any,
) => (
  <StyledButton
    activeOpacity={0.8}
    disabled={disabled}
    onPress={onPress}
    style={style}>
    <Text
      text={text}
      color={disabled ? 'gray-600' : 'gray-0'}
      type="body1"
      fontWeight="bold"
      lineHeight={buttonSizes[size]}
      style={{textAlign: 'center'}}
    />
  </StyledButton>
);
