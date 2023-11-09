import React from 'react';

import styled from '@emotion/native';

import {Gap} from '../../../../components/Gap';
import {Tag} from '../../../../components/Tag';
import {Text} from '../../../../components/Text';

interface IMatchDetailResultAnalyzeTabItemProps {
  subject: string;
  message: string;
}

export const MatchDetailResultAnalyzeTabItem = ({
  subject,
  message,
}: IMatchDetailResultAnalyzeTabItemProps): React.JSX.Element => {
  return (
    <StyledItemWrapper>
      <Text
        type="body3"
        color="gray-600"
        text={`두 팀의 ${subject} 비교한 결과,`}
      />
      <Gap size="10px" />
      <Tag
        type="md"
        hasBorder={false}
        backgroundColor="main-300"
        borderColor="main-300"
        fontWeight="700"
        text={message}
      />
    </StyledItemWrapper>
  );
};

const StyledItemWrapper = styled.View`
  align-items: center;
`;
