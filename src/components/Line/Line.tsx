import React from 'react';

import styled from '@emotion/native';

export interface ILineProps {
  size: 'sm' | 'lg';
}

interface IStyledLine extends ILineProps {}

export const Line = ({size}: ILineProps): React.JSX.Element => {
  return <StyledLine size={size} />;
};

const StyledLine = styled.View<IStyledLine>`
  background-color: ${props => props.theme.palette['gray-50']};
  height: ${props => (props.size === 'sm' ? '2px' : '14px')};
  width: 100%;
`;
