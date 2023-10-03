import React from 'react';

import styled from '@emotion/native';

import {Text} from '../../../../components/Text';

interface IMatchApplyHeaderProps {
  type: 'RECEIVED' | 'SENT' | 'MATCHED';
  settingIcon?: React.JSX.Element;
}

export const MatchApplyHeader = ({
  type,
  settingIcon,
}: IMatchApplyHeaderProps): React.JSX.Element => {
  const titleByType = {
    RECEIVED: '요청받은 매칭',
    SENT: '신청한 매칭',
    MATCHED: '진행중인 매칭',
  } as const;

  return (
    <StyledHeaderWrapper>
      <Text type="head4" fontWeight="600" text={titleByType[type]} />
      {settingIcon}
    </StyledHeaderWrapper>
  );
};

const StyledHeaderWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 32px 16px 20px 16px;
`;
