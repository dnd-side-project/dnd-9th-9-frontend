import React from 'react';

import styled from '@emotion/native';
import {type NativeStackScreenProps} from '@react-navigation/native-stack';
import {SafeAreaView, ScrollView, View} from 'react-native';

import {theme} from '../../../assets/styles/theme';
import {penXmlData} from '../../../assets/svg';
import {Gap} from '../../../components/Gap';
import {Icon} from '../../../components/Icon';
import {Line} from '../../../components/Line';
import {TopBar} from '../../../components/TopBar';
import {SkillLevels} from '../../../features/match/const';
import {ProfileListItem} from '../../../features/my/components/profile';
import {useGetMyProfileDetail} from '../../../features/my/hooks/profile';
import {type MyStackParamList} from '../../../navigators/MyNavigator';

type Props = NativeStackScreenProps<MyStackParamList, 'MyProfile'>;

export function MyProfileScreen({navigation}: Props): React.JSX.Element {
  const {data: myProfileDetail, isSuccess} = useGetMyProfileDetail();

  return (
    <SafeAreaView style={{backgroundColor: theme.palette['gray-0']}}>
      {isSuccess ? (
        <>
          <TopBar
            headerText="프로필 편집"
            showBackButton
            onPressBackButton={() => {
              navigation.pop();
            }}
          />

          <ScrollView>
            <StyledProfileSection>
              <StyledProfileContainer>
                {myProfileDetail.profileImg != null ? (
                  <StyledProfileImage
                    source={{uri: myProfileDetail.profileImg}}
                  />
                ) : (
                  <StyledProfilePlaceholder />
                )}
                <StyledIconWrapper>
                  <Icon
                    svgXml={penXmlData}
                    color={theme.palette['gray-0']}
                    width={18}
                    height={18}
                  />
                </StyledIconWrapper>
              </StyledProfileContainer>
            </StyledProfileSection>

            <StyledProfileList>
              <ProfileListItem
                label="이름"
                value={myProfileDetail.name}
                onPress={() => {}}
              />
              <Line size="sm" color="gray-200" />
              <ProfileListItem
                label="몸무게"
                value={`${myProfileDetail.weight}kg`}
                onPress={() => {}}
              />
              <Line size="sm" color="gray-200" />
              <ProfileListItem
                label="운동레벨"
                value={SkillLevels[myProfileDetail.skillLevel]}
                onPress={() => {}}
              />
              <Line size="sm" color="gray-200" />
              <ProfileListItem
                label="목표 칼로리"
                value={`${myProfileDetail.calorieGoal}kcal`}
                onPress={() => {}}
              />
            </StyledProfileList>
            <Gap size="60px" />
          </ScrollView>
        </>
      ) : (
        <View></View>
      )}
    </SafeAreaView>
  );
}

const StyledProfileList = styled.View`
  padding: 0 16px;
`;

const StyledProfileImage = styled.Image`
  width: 100px;
  height: 100px;
  border-radius: 50px;
  overflow: hidden;
`;

const StyledProfilePlaceholder = styled.View`
  width: 100px;
  height: 100px;
  border-radius: 50px;
  overflow: hidden;
  background-color: ${({theme}) => theme.palette['gray-400']};
`;

const StyledProfileSection = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 40px;
  margin-bottom: 50px;
`;

const StyledProfileContainer = styled.TouchableOpacity`
  position: relative;
`;

const StyledIconWrapper = styled.View`
  width: 32px;
  height: 32px;
  border-radius: 16px;
  background-color: ${({theme}) => theme.palette['gray-900']};
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 0;
  right: 0;
`;
