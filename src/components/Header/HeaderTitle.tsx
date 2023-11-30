import React from 'react';

import styled from '@emotion/native';

import {Text} from '../Text';

interface IHeaderTitleProps {
  title?: string;
}

export const HeaderTitle = ({
  title = '',
}: IHeaderTitleProps): React.JSX.Element => {
  return (
    <StyledHeaderWrapper>
      <Text type="body1" fontWeight="700" textAlign="center" text={title} />
    </StyledHeaderWrapper>
  );
};

const StyledHeaderWrapper = styled.View`
  height: 48px;
  justify-content: center;
`;
