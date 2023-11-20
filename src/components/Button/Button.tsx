import React from 'react';

import styled from '@emotion/native';

import {type theme} from '../../assets/styles/theme';
import {Text} from '../Text';

type TButtonSize = 'sm' | 'md' | 'lg';
type TButtonVariant = 'primary' | 'secondary' | 'tertiary';

export interface IButtonProps {
  disabled?: boolean;
  text: string;
  size?: TButtonSize;
  variant?: TButtonVariant;
  style?: any;
  onPress: () => void;
}

interface IStyledButton {
  disabled: boolean;
  variant: TButtonVariant;
  style?: any;
}

const buttonSizes: Record<TButtonSize, string> = {
  sm: '56px',
  md: '72px',
  lg: '96px',
};

const variantStyles: Record<
  TButtonVariant,
  {
    backgroundColor: keyof typeof theme.palette;
    color: keyof typeof theme.palette;
  }
> = {
  primary: {
    backgroundColor: 'main-300',
    color: 'gray-0',
  },
  secondary: {
    backgroundColor: 'gray-50',
    color: 'black',
  },
  tertiary: {
    backgroundColor: 'gray-800',
    color: 'gray-0',
  },
};

const StyledButton = styled.TouchableOpacity<IStyledButton>`
  background: ${props =>
    props.disabled
      ? props.theme.palette['gray-200']
      : props.theme.palette[variantStyles[props.variant].backgroundColor]};

  ${props => props.style}
`;

export const Button = (
  {
    text,
    size = 'sm',
    onPress,
    disabled = false,
    variant = 'primary',
    style,
  }: IButtonProps,
  props: any,
): React.JSX.Element => (
  <StyledButton
    activeOpacity={0.8}
    disabled={disabled}
    onPress={onPress}
    variant={variant}
    style={style}>
    <Text
      text={text}
      color={disabled ? 'gray-600' : variantStyles[variant].color}
      type="body1"
      fontWeight="bold"
      lineHeight={buttonSizes[size]}
      style={{textAlign: 'center'}}
    />
  </StyledButton>
);
