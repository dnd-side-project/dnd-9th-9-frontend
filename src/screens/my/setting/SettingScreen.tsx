import React, {useMemo} from 'react';

import styled from '@emotion/native';
import {useNavigation} from '@react-navigation/native';
import {type NativeStackNavigationProp} from '@react-navigation/native-stack';
import {SafeAreaView} from 'react-native';

import {theme} from '../../../assets/styles/theme';
import {arrowRightXmlData} from '../../../assets/svg';
import {Icon} from '../../../components/Icon';
import {Line} from '../../../components/Line';
import {Text} from '../../../components/Text';
import {TopBar} from '../../../components/TopBar';
import {LOGIN_TYPE} from '../../../features/my/const';
import {useGetMyProfileDetail} from '../../../features/my/hooks/profile';
import {type MyStackParamList} from '../../../navigators/MyNavigator';

export function SettingScreen(): React.JSX.Element {
  const navigation =
    useNavigation<NativeStackNavigationProp<MyStackParamList>>();

  const {data: myProfileDetail} = useGetMyProfileDetail();

  const linkedSnsLabel = useMemo(() => {
    return myProfileDetail?.loginType != null
      ? LOGIN_TYPE[myProfileDetail.loginType]
      : '';
  }, []);

  return (
    <>
      <SafeAreaView style={{backgroundColor: theme.palette['gray-0']}} />
      <TopBar
        headerText="설정"
        showBackButton
        onPressBackButton={() => {
          navigation.pop();
        }}
      />
      <StyledContainer>
        <StyledSettingListItemPressable
          onPress={() => {
            navigation.navigate('SettingConnectedAccount');
          }}>
          <Text text="연결된 계정" color="gray-900" fontWeight="600" />
          <StyledHorizontal>
            <Text color="gray-800" type="body3" text={linkedSnsLabel} />
            <Icon
              svgXml={arrowRightXmlData}
              width={30}
              color={theme.palette.black}
            />
          </StyledHorizontal>
        </StyledSettingListItemPressable>
        <StyledSettingListItemPressable>
          <Text text="알림 설정" color="gray-900" fontWeight="600" />
          <Icon
            svgXml={arrowRightXmlData}
            width={30}
            color={theme.palette.black}
          />
        </StyledSettingListItemPressable>

        <Line size="sm" color="gray-200" />

        <StyledSettingListItemPressable
          onPress={() => {
            // TODO(@minimalKim): 이메일 띄우기
          }}>
          <Text text="고객센터" color="gray-900" fontWeight="600" />
          <Icon
            svgXml={arrowRightXmlData}
            width={30}
            color={theme.palette.black}
          />
        </StyledSettingListItemPressable>
        <StyledSettingListItemPressable
          onPress={() => {
            // TODO(@minimalKim): 이용약관 페이지 이동
          }}>
          <Text text="이용약관" color="gray-900" fontWeight="600" />
          <Icon
            svgXml={arrowRightXmlData}
            width={30}
            color={theme.palette.black}
          />
        </StyledSettingListItemPressable>
        <StyledSettingListItem>
          <StyledHorizontal>
            <Text text="버전" color="gray-900" fontWeight="600" />
            {/* TODO(@minimalKim): 앱 빌드 시 버전 기록 연동 */}
            <Text text="1.0" color="blue-400" fontWeight="bold" />
          </StyledHorizontal>
          {/*  TODO(@minimalKim): config API 생성 및 최신 버전 비교 필요 */}
        </StyledSettingListItem>

        <Line size="sm" color="gray-200" />

        <StyledSettingListItemPressable
          onPress={() => {
            // TODO(@minimalKim): 로그아웃 API 연동
          }}>
          <Text text="로그아웃" color="error-dark" />
          <Icon
            svgXml={arrowRightXmlData}
            width={30}
            color={theme.palette.black}
          />
        </StyledSettingListItemPressable>
      </StyledContainer>
    </>
  );
}

const StyledContainer = styled.View`
  background-color: ${({theme}) => theme.palette['gray-0']};
  height: 100%;
  padding: 0 16px;
`;

const StyledSettingListItem = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 20px 8px;
`;

const StyledSettingListItemPressable = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 20px 8px;
`;

const StyledHorizontal = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 4px;
`;
