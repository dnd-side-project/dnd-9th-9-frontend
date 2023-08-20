import React from 'react';

import styled from '@emotion/native';

import {Text} from '../../../../components/Text';

interface IStyledSummaryCardItemProps {
  text: string;
  value: string;
}

export const SummaryCardItem = ({
  text,
  value,
}: IStyledSummaryCardItemProps): React.JSX.Element => (
  <StyledSummaryCardItem>
    <Text type="body2" text={text} fontWeight="600" />
    <Text type="head2" text={value} fontWeight="600" />
  </StyledSummaryCardItem>
);

const StyledSummaryCardItem = styled.View`
  border-radius: 12px;
  background-color: ${props => props.theme.palette['gray-50']};
  padding: 14px 12px 20px;
  gap: 24px;
  margin-bottom: 16px;
`;
