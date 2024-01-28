import React from 'react';

import styled from '@emotion/native';
import {useNavigation} from '@react-navigation/native';
import {type NativeStackNavigationProp} from '@react-navigation/native-stack';

import {Text} from '../../../../components/Text';
import {type MatchStackParamList} from '../../../../navigators';

export const NoMatching = (): React.JSX.Element => {
  const navigation =
    useNavigation<NativeStackNavigationProp<MatchStackParamList>>();

  return (
    <StyledNoMatchingContainer>
      <Text
        text={`진행 중인 \n매칭이 없어요`}
        textAlign="center"
        color="gray-600"
        type="body3"
      />
      <StyledMatchingButton
        onPress={() => {
          navigation.navigate('MatchList', {
            page: 0,
            size: 10,
            fieldType: 'DUEL',
            goal: [],
            memberCount: null,
            period: [],
            skillLevel: [],
            strength: [],
            keyword: '',
          });
        }}>
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
  height: 300px;
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
