import React from 'react';

import styled from '@emotion/native';
import {SafeAreaView, TouchableOpacity} from 'react-native';

import {theme} from '../../../assets/styles/theme';
import {Text} from '../../../components/Text';
import {TopBar} from '../../../components/TopBar';

export const TeamworkRateHistory = (): React.JSX.Element => {
  return (
    <>
      <>
        <SafeAreaView style={{backgroundColor: theme.palette['gray-0']}} />
        <TopBar showBackButton headerText="불꽃 히스토리" />
        <StyledTabContainer>
          <TouchableOpacity>
            <Text text="전쳬보기" type="body3" color="gray-400" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Text text="1:1 매칭" type="body3" color="gray-400" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Text text="팀 매칭" type="body3" color="gray-400" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Text text="매칭 없는 팀" type="body3" color="gray-400" />
          </TouchableOpacity>
        </StyledTabContainer>
        <StyledScrollView></StyledScrollView>
      </>
    </>
  );
};

const StyledTabContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 30px;
  padding: 16px;
  background-color: ${({theme}) => theme.palette['gray-0']};
`;

const StyledScrollView = styled.ScrollView`
  background-color: ${({theme}) => theme.palette['gray-0']};
`;
