import React from 'react';

import styled from '@emotion/native';

import {type theme} from '../../assets/styles/theme';

const SIZE = {
  xs: '1px',
  sm: '2px',
  lg: '14px',
} as const;
export interface ILineProps {
  size: keyof typeof SIZE;
  color?: keyof typeof theme.palette;
}

interface IStyledLine extends ILineProps {
  color: keyof typeof theme.palette;
}

export const Line = ({
  size,
  color = 'gray-50',
}: ILineProps): React.JSX.Element => {
  return <StyledLine size={size} color={color} />;
};

const StyledLine = styled.View<IStyledLine>`
  background-color: ${({theme, color}) => theme.palette[color]};
  height: ${props => SIZE[props.size]};
  width: 100%;
`;
