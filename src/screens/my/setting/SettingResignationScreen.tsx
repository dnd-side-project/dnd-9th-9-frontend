import React, {useMemo, useState} from 'react';

import styled from '@emotion/native';
import {useNavigation} from '@react-navigation/native';
import {type NativeStackNavigationProp} from '@react-navigation/native-stack';
import {SafeAreaView} from 'react-native';

import {theme} from '../../../assets/styles/theme';
import {Button} from '../../../components/Button';
import {CheckBox} from '../../../components/CheckBox';
import {LinedCheckBox} from '../../../components/CheckBox/LinedCheckBox';
import {Gap} from '../../../components/Gap';
import {TopBar} from '../../../components/TopBar';
import {ResignationAchievementCard} from '../../../features/my/components';
import {useGetMyWithdraw} from '../../../features/my/hooks/profile';
import {type RootStackParamList} from '../../../navigators';

interface ITerms {
  personalInfo: boolean;
  id: boolean;
}

type TTerm = keyof ITerms;

export function SettingResignationScreen(): React.JSX.Element {
  const [terms, setTerms] = useState<ITerms>({
    personalInfo: false,
    id: false,
  });

  const setTerm = (termId: TTerm, isChecked: boolean): void => {
    setTerms(terms => ({...terms, [termId]: isChecked}));
  };

  const setAllTerms = (value: boolean): void => {
    setTerms(prevTerms => {
      const newTerms = {...prevTerms};
      (Object.keys(newTerms) as Array<keyof typeof newTerms>).forEach(key => {
        newTerms[key] = value;
      });
      return newTerms;
    });
  };

  const isAllTermsChecked = useMemo(() => {
    return Object.values(terms).every(isChecked => isChecked);
  }, [terms]);

  const appNavigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const {refetch: withdraw} = useGetMyWithdraw({
    options: {
      enabled: false,
      onSuccessCallback: () => {
        appNavigation.replace('Landing');
      },
    },
  });

  return (
    <>
      <SafeAreaView style={{backgroundColor: theme.palette['gray-0']}} />
      <TopBar headerText="회원탈퇴" showBackButton />
      <StyledContainer>
        <StyledContentsSection>
          <Gap size={'10px'} />
          <ResignationAchievementCard />

          <StyledTermsContainer>
            <StyledHorizontal>
              <CheckBox
                isCheck={isAllTermsChecked}
                label="안내사항을 확인하고 회원탈퇴에 동의해주세요"
                onPress={() => {
                  setAllTerms(!isAllTermsChecked);
                }}
              />
            </StyledHorizontal>

            <StyledHorizontal style={{paddingLeft: 16, height: 28}}>
              <LinedCheckBox
                label="그동안 회원님의 활동, 개인 정보와 설정이 삭제돼요."
                isCheck={terms.personalInfo}
                onPress={() => {
                  setTerm('personalInfo', !terms.personalInfo);
                }}
              />
            </StyledHorizontal>

            <StyledHorizontal style={{paddingLeft: 16, height: 28}}>
              <LinedCheckBox
                isCheck={terms.id}
                label="연결된 소셜 계정 및 ID가 삭제돼요."
                onPress={() => {
                  setTerm('id', !terms.id);
                }}
              />
            </StyledHorizontal>
          </StyledTermsContainer>
        </StyledContentsSection>
        <FixedButtonWrapper>
          <Button
            text="탈퇴하기"
            variant="tertiary"
            disabled={!isAllTermsChecked}
            onPress={() => {
              void withdraw();
            }}
          />
        </FixedButtonWrapper>
      </StyledContainer>
    </>
  );
}

const StyledContainer = styled.View`
  background-color: ${({theme}) => theme.palette['gray-0']};
  flex: 1;

  justify-content: space-between;
`;

const StyledHorizontal = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const StyledTermsContainer = styled.View`
  padding-top: 24px;
`;

const StyledContentsSection = styled.View`
  padding: 0 16px;
`;

const FixedButtonWrapper = styled.View`
  width: 100%;
`;
