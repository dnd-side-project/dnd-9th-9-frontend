import React from 'react';

import styled from '@emotion/native';

import {Text} from '../../../../components/Text';

export const NoMatching = (): React.JSX.Element => {
  return (
    <StyledNoMatchingContainer>
      <Text
        text={`진행 중인 \n매칭이 없어요`}
        textAlign="center"
        color="gray-600"
        type="body3"
      />
      <StyledMatchingButton>
        <Text
          text="매칭 상대 찾아보기"
          type="body3"
          fontWeight="600"
          color="gray-600"
        />
      </StyledMatchingButton>
    </StyledNoMatchingContainer>
  );
};

const StyledNoMatchingContainer = styled.View`
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
`;

const StyledMatchingButton = styled.TouchableOpacity`
  border-radius: 16px;
  background-color: ${({theme}) => theme.palette['gray-100']};
  padding: 16px 26px;
`;
