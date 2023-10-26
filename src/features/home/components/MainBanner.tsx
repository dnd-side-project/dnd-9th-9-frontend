import React from 'react';

import styled from '@emotion/native';
import {useNavigation} from '@react-navigation/native';
import {type NativeStackNavigationProp} from '@react-navigation/native-stack';
import {StatusBar, TouchableOpacity, View} from 'react-native';

import {alarmXmlData} from '../../../assets/svg';
import {Icon} from '../../../components/Icon';
import {Text} from '../../../components/Text';
import {type HomeStackParamList} from '../../../navigators';
import {useGetUserFieldProgress} from '../../match/hooks/userField';
import {useGetMyProfileDetail} from '../../my/hooks/profile';

export const MainBanner = (): React.JSX.Element => {
  const {data: userFieldProgress} = useGetUserFieldProgress();
  const {data: myProfileDetail} = useGetMyProfileDetail();

  const navigation =
    useNavigation<NativeStackNavigationProp<HomeStackParamList>>();

  return (
    <StyledTopBanner>
      <StatusBar barStyle="light-content" />

      <View>
        <StyledIconWrapper>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Notification');
            }}>
            <Icon svgXml={alarmXmlData} width={24} height={24} />
          </TouchableOpacity>
        </StyledIconWrapper>

        {myProfileDetail != null && (
          <Text
            type="head3"
            color={'gray-0'}
            lineHeight="33.6px"
            fontWeight="700"
            text={`${myProfileDetail?.name} 님, \n오늘도 목표를 향해 \n달려볼까요?🔥`}
          />
        )}
      </View>

      {userFieldProgress != null && (
        <Text
          type="body3"
          color="gray-600"
          fontWeight="600"
          text={`현재 진행 중인 매칭 ${userFieldProgress.length}개`}
        />
      )}
      <StyledImage
        source={require('../../../assets/images/main-character-image.png')}
      />
    </StyledTopBanner>
  );
};

const StyledTopBanner = styled.View`
  height: 374px;
  display: flex;
  background-color: ${({theme}) => theme.palette['gray-950']};
  padding: 28px 20px;
  justify-content: space-between;
`;

const StyledIconWrapper = styled.View`
  display: flex;
  align-items: flex-end;
  margin-top: 10px;
  margin-bottom: 6px;
`;

const StyledImage = styled.Image`
  width: 206px;
  height: 178px;
  position: absolute;
  bottom: 14px;
  right: 8px;
`;
