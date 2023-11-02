import React from 'react';

import styled from '@emotion/native';

import {type theme} from '../../assets/styles/theme';

export interface ILineProps {
  size: 'sm' | 'lg';
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
  height: ${props => (props.size === 'sm' ? '2px' : '14px')};
  width: 100%;
`;
