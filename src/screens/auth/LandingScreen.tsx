import React from 'react';

import styled from '@emotion/native';
import {type NativeStackScreenProps} from '@react-navigation/native-stack';

import {Button} from '../../components/Button';
import {type RootStackParamList} from '../../navigators';

type Props = NativeStackScreenProps<RootStackParamList, 'Landing'>;

export function LandingScreen({navigation}: Props): React.JSX.Element {
  return (
    <StyledSafeAreaView>
      <StyledImageWrapper>
        <StyledImage source={require('../../assets/images/logo.png')} />
      </StyledImageWrapper>

      <StyledButtonContainer>
        <Button
          text="로그인"
          size="md"
          style={{borderRadius: 16}}
          onPress={() => {}}
        />
        <Button
          text="회원가입"
          size="md"
          variant="secondary"
          style={{
            borderRadius: 16,
          }}
          onPress={() => {}}
        />
      </StyledButtonContainer>
    </StyledSafeAreaView>
  );
}

const StyledSafeAreaView = styled.View`
  height: 100%;
  background-color: ${({theme}) => theme.palette['gray-0']};
`;

const StyledImageWrapper = styled.View`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledImage = styled.Image`
  width: 88px;
  height: 99px;
`;

const StyledButtonContainer = styled.View`
  display: flex;
  gap: 16px;
  position: absolute;
  bottom: 0;
  width: 100%;
  padding-bottom: 60px;
  padding-left: 20px;
  padding-right: 20px;
`;
