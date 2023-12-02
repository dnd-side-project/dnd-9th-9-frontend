import React, {useMemo, useState} from 'react';

import styled from '@emotion/native';
import {useNavigation} from '@react-navigation/native';
import {type NativeStackNavigationProp} from '@react-navigation/native-stack';
import {View} from 'react-native';
import email from 'react-native-email';

import {theme} from '../../../assets/styles/theme';
import {arrowRightXmlData} from '../../../assets/svg';
import {Icon} from '../../../components/Icon';
import {Line} from '../../../components/Line';
import {ConfirmModal} from '../../../components/Modal';
import {Text} from '../../../components/Text';
import {TopBar} from '../../../components/TopBar';
import {useGetLogout} from '../../../features/auth/hooks/auth/useGetLogout';
import {LOGIN_TYPE} from '../../../features/my/const';
import {useGetMyProfileDetail} from '../../../features/my/hooks/profile';
import {type RootStackParamList} from '../../../navigators';
import {type MyStackParamList} from '../../../navigators/MyNavigator';

export function SettingScreen(): React.JSX.Element {
  const myNavigation =
    useNavigation<NativeStackNavigationProp<MyStackParamList>>();

  const appNavigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const {data: myProfileDetail} = useGetMyProfileDetail();

  const linkedSnsLabel = useMemo(() => {
    return myProfileDetail?.loginType != null
      ? LOGIN_TYPE[myProfileDetail.loginType]
      : '';
  }, []);

  const {refetch: getLogout} = useGetLogout({
    options: {
      enabled: false,
      onSuccessCallback: () => {
        appNavigation.popToTop();
        appNavigation.navigate('Landing');
      },
    },
  });

  const handlePressLogout = (): void => {
    void getLogout();
  };

  const [modal, setModal] = useState({
    visible: false,
    title: '메일 서비스 접근 불가',
    subTitle: `앱스토어 또는 minimalkim.dev@gmail.com
    메일로 문의해주세요.`,
  });

  const toggleModal = (visible?: boolean): void => {
    setModal(modal => ({...modal, visible: visible ?? !modal.visible}));
  };

  // NOTE: iOS 시뮬레이터에서 미동작, 실제 기기에서만 동작
  const handlePressCS = (): void => {
    // TODO(@minimalKim): 서비스용 메일 추가 필요
    const to = ['minimalkim.dev@gmail.com'];
    email(to, {
      subject: '[매치업] 서비스 관련 문의',
      body: '서비스를 이용하면서 발생한 문제를 작성해주세요.',
    }).catch(() => {
      toggleModal(true);
    });
  };

  return (
    <>
      <View style={{backgroundColor: theme.palette['gray-0']}} />
      <TopBar headerText="설정" showBackButton />
      <StyledContainer>
        <StyledSettingListItemPressable
          onPress={() => {
            myNavigation.navigate('SettingConnectedAccount');
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

        <StyledSettingListItemPressable onPress={handlePressCS}>
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

        <StyledSettingListItemPressable onPress={handlePressLogout}>
          <Text text="로그아웃" color="error-dark" />
          <Icon
            svgXml={arrowRightXmlData}
            width={30}
            color={theme.palette.black}
          />
        </StyledSettingListItemPressable>

        <ConfirmModal
          {...modal}
          handleConfirm={() => {
            toggleModal(false);
          }}
        />
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
