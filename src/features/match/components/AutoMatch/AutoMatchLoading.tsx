import React from 'react';

import styled from '@emotion/native';
import {Image} from 'react-native';

import {Gap} from '../../../../components/Gap';
import {Text} from '../../../../components/Text';

export const AutoMatchLoading = (): React.JSX.Element => {
  return (
    <StyledWrapper style={{justifyContent: 'center', alignItems: 'center'}}>
      <Image
        source={require('../../../../assets/images/auto-match-loading.png')}
      />
      <Gap size="20px" />
      <Text
        type="body1"
        textAlign="center"
        fontWeight="700"
        text="조건에 맞는 매칭을 찾고 있어요!"
      />
    </StyledWrapper>
  );
};

const StyledWrapper = styled.SafeAreaView`
  flex: 1;
  background-color: ${props => props.theme.palette['gray-0']};
`;
