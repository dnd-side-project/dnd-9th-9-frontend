import React, {useEffect, useState} from 'react';

import styled from '@emotion/native';
import {type NativeStackScreenProps} from '@react-navigation/native-stack';

import {theme} from '../../assets/styles/theme';
import {
  appleLogoXmlData,
  kakaoLogoXmlData,
  googleLogoXmlData,
} from '../../assets/svg';
import {BottomSheet} from '../../components/BottomSheet';
import {Button} from '../../components/Button';
import {Icon} from '../../components/Icon';
import {Text} from '../../components/Text';
import {usePostRefreshAccessToken} from '../../features/auth/hooks/auth';
import {asyncStorage} from '../../lib/asyncStorage';
import {type RootStackParamList} from '../../navigators';

type Props = NativeStackScreenProps<RootStackParamList, 'Landing'>;

export function LandingScreen({navigation}: Props): React.JSX.Element {
  const [showBottomModal, setShowBottomModal] = useState(false);
  const [isSelectedLogin, setIsSelectedLogin] = useState(false);

  const getSnsButtonLabel = (sns: string): string => {
    return `${sns === 'Apple' ? `${sns}로` : sns} ${
      isSelectedLogin ? '로그인' : '계속하기'
    }`;
  };

  const {mutate: postRefreshAccessToken} = usePostRefreshAccessToken({
    onSuccessCallback: () => {
      navigation.navigate('Main');
    },
  });

  const refreshAccessToken = async (): Promise<void> => {
    const refreshToken = await asyncStorage.get<string>(
      'auth-jwt-refresh-token',
    );

    if (refreshToken != null) {
      postRefreshAccessToken({
        body: {
          refreshToken,
        },
      });
    }
  };

  useEffect(() => {
    void refreshAccessToken();
  }, []);

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
          onPress={() => {
            setShowBottomModal(true);
            setIsSelectedLogin(true);
          }}
        />
        <Button
          text="회원가입"
          size="md"
          variant="secondary"
          style={{
            borderRadius: 16,
          }}
          onPress={() => {
            setShowBottomModal(true);
            setIsSelectedLogin(false);
          }}
        />
      </StyledButtonContainer>

      <BottomSheet
        isOpened={showBottomModal}
        style={{backgroundColor: theme.palette['gray-50']}}
        onClose={() => {
          setShowBottomModal(false);
        }}>
        <BottomSheet.Content>
          <StyledView>
            <Text
              text="소셜 로그인으로 3초만에 시작하기"
              type="body2"
              color="gray-700"
              fontWeight="600"
              style={{paddingTop: 18, paddingBottom: 34}}
            />
            <StyledSnsButtonContainer>
              <StyledSnsButton backgroundColor={theme.palette.black}>
                <Icon svgXml={appleLogoXmlData} width={20} height={20} />
                <Text
                  text={getSnsButtonLabel('Apple')}
                  type="body2"
                  color="gray-0"
                  fontWeight="600"
                />
              </StyledSnsButton>
              <StyledSnsButton backgroundColor={'#FEE500'}>
                <Icon svgXml={kakaoLogoXmlData} width={20} height={20} />
                <Text
                  text={getSnsButtonLabel('카카오')}
                  type="body2"
                  color="gray-800"
                  fontWeight="600"
                />
              </StyledSnsButton>
              <StyledSnsButton backgroundColor={theme.palette['gray-0']}>
                <Icon svgXml={googleLogoXmlData} width={20} height={20} />
                <Text
                  text={getSnsButtonLabel('구글')}
                  type="body2"
                  color="gray-900"
                  fontWeight="600"
                />
              </StyledSnsButton>
            </StyledSnsButtonContainer>

            {isSelectedLogin ? (
              <StyledHorizontalView>
                <StyledTextButton
                  onPress={() => {
                    setShowBottomModal(false);
                    navigation.push('FindId');
                  }}>
                  <Text
                    text="아이디 찾기"
                    type="body2"
                    color="gray-600"
                    fontWeight="500"
                  />
                </StyledTextButton>
                <Text text="|" type="body2" color="gray-600" fontWeight="500" />
                <StyledTextButton
                  onPress={() => {
                    setShowBottomModal(false);
                    navigation.push('FindPassword');
                  }}>
                  <Text
                    text="비밀번호 찾기"
                    type="body2"
                    color="gray-600"
                    fontWeight="500"
                  />
                </StyledTextButton>
                <Text text="|" type="body2" color="gray-600" fontWeight="500" />
                <StyledTextButton
                  onPress={() => {
                    setShowBottomModal(false);
                    navigation.push('Login');
                  }}>
                  <Text
                    text="일반 로그인"
                    type="body2"
                    color="gray-600"
                    fontWeight="500"
                  />
                </StyledTextButton>
              </StyledHorizontalView>
            ) : (
              <StyledTextButton
                onPress={() => {
                  setShowBottomModal(false);
                  navigation.push('Signup');
                }}>
                <Text
                  text="이메일로 가입하기"
                  type="body2"
                  color="gray-600"
                  fontWeight="500"
                />
              </StyledTextButton>
            )}
          </StyledView>
        </BottomSheet.Content>
      </BottomSheet>
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

const StyledView = styled.View`
  width: 100%;
  display: flex;
  align-items: center;
`;

const StyledSnsButtonContainer = styled.View`
  display: flex;
  gap: 16px;
  width: 100%;
`;

const StyledSnsButton = styled.TouchableOpacity<{
  backgroundColor: string;
}>`
  background-color: ${({backgroundColor}) => backgroundColor};
  border-radius: ${({theme}) => theme.borderRadius.md};
  height: 50px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 8px;
`;

const StyledTextButton = styled.TouchableOpacity`
  margin-top: 16px;
  margin-bottom: 14px;
  padding: 6px;
`;

const StyledHorizontalView = styled.View`
  display: flex;
  flex-direction: row;
  gap: 8px;
  align-items: center;
`;
