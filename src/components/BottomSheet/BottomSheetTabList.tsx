import React, {type PropsWithChildren} from 'react';

import styled from '@emotion/native';

export const BottomSheetTabList = ({
  children,
}: PropsWithChildren): React.JSX.Element => {
  return <StyledBottomSheetTabList>{children}</StyledBottomSheetTabList>;
};

const StyledBottomSheetTabList = styled.View`
  display: flex;
  flex-direction: row;
  padding: 6px;
  gap: 24px;
  width: 100%;
`;
