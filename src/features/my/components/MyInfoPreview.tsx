import React from 'react';

import styled from '@emotion/native';
import {useNavigation} from '@react-navigation/native';
import {type NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Image} from 'react-native';

import {theme} from '../../../assets/styles/theme';
import {arrowRightXmlData} from '../../../assets/svg';
import {Icon} from '../../../components/Icon';
import {Text} from '../../../components/Text';
import {type MyStackParamList} from '../../../navigators/MyNavigator';
import {useGetMyProfileDetail} from '../hooks/profile';

export const MyInfoPreview = (): React.JSX.Element => {
  const {data: myProfileDetail, isSuccess} = useGetMyProfileDetail();

  const navigation =
    useNavigation<NativeStackNavigationProp<MyStackParamList>>();

  return isSuccess ? (
    <StyledMyInfoPreview
      onPress={() => {
        navigation.navigate('MyProfile');
      }}>
      {myProfileDetail?.profileImg != null ? (
        <Image
          source={{uri: myProfileDetail.profileImg}}
          style={{width: 140, height: 140}}
        />
      ) : (
        <StyledProfilePlaceholder />
      )}
      <StyledRightSection>
        <StyledTextContainer>
          <Text text={myProfileDetail.name} type="head3" fontWeight="bold" />
          <Text
            text={`하루 목표 칼로리 ${
              myProfileDetail.calorieGoal === 0
                ? '없음'
                : `${myProfileDetail.calorieGoal}kcal`
            }`}
            type="body3"
            fontWeight="bold"
            color="gray-600"
          />
        </StyledTextContainer>
        <Icon svgXml={arrowRightXmlData} color={theme.palette['gray-900']} />
      </StyledRightSection>
    </StyledMyInfoPreview>
  ) : (
    <StyledMyInfoPreviewPlaceholder>
      <StyledProfilePlaceholder />
      <StyledRightSection>
        <StyledTextContainer />
        <Icon svgXml={arrowRightXmlData} color={theme.palette['gray-900']} />
      </StyledRightSection>
    </StyledMyInfoPreviewPlaceholder>
  );
};

const StyledMyInfoPreview = styled.TouchableOpacity`
  height: 100px;
  padding: 0 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 18px;
`;

const StyledMyInfoPreviewPlaceholder = styled.View`
  height: 100px;
  padding: 0 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 18px;
`;

const StyledProfilePlaceholder = styled.View`
  background-color: ${({theme}) => theme.palette['gray-200']};
  width: 70px;
  height: 70px;
  border-radius: 35px;
`;

const StyledRightSection = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex: 1;
`;

const StyledTextContainer = styled.View`
  display: flex;
  gap: 6px;
`;
