import React from 'react';

import styled from '@emotion/native';

import {Gap} from '../../../../components/Gap';
import {Text} from '../../../../components/Text';
import {Periods} from '../../const';
import {type TPeriod} from '../../types';

interface IMatchDetailResultSectionProps {
  period: TPeriod;
  title: string;
}

export const MatchDetailResultSection = ({
  period,
  title,
}: IMatchDetailResultSectionProps): React.JSX.Element => {
  return (
    <StyledResultSectionWrapper>
      <Text
        type="body3"
        color="gray-400"
        fontWeight="400"
        text="2023. 10. 01 - 2023. 10. 15"
      />
      <Gap size="15px" />
      <Text
        type="body3"
        color="gray-700"
        fontWeight="400"
        text={`${Periods[period]}간 매칭진행 결과`}
      />
      <Gap size="10px" />
      <Text type="body1" fontWeight="600" text={title} />
    </StyledResultSectionWrapper>
  );
};

const StyledResultSectionWrapper = styled.View`
  align-items: center;
  border-width: 1px;
  padding-top: 32px;
  padding-bottom: 40px;
  border-bottom-left-radius: ${props => props.theme.borderRadius.md};
  border-bottom-right-radius: ${props => props.theme.borderRadius.md};
  border-color: ${props => props.theme.palette['gray-100']};
`;
