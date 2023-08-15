import React from 'react';

import styled from '@emotion/native';

export interface IGapProps {
  size: string;
}

interface IStyledGap {
  size: string;
}

const StyledGap = styled.View<IStyledGap>`
  height: ${props => props.size};
`;

export const Gap = ({size}: IGapProps): React.JSX.Element => (
  <StyledGap size={size} />
);
