import React, {useMemo, useState} from 'react';

import styled from '@emotion/native';
import {useNavigation} from '@react-navigation/native';
import {type NativeStackNavigationProp} from '@react-navigation/native-stack';
import {SafeAreaView} from 'react-native';

import {theme} from '../../../assets/styles/theme';
import {checkXmlData} from '../../../assets/svg';
import {CheckBox} from '../../../components/CheckBox';
import {Gap} from '../../../components/Gap';
import {Icon} from '../../../components/Icon';
import {Text} from '../../../components/Text';
import {TopBar} from '../../../components/TopBar';
import {ResignationAchievementCard} from '../../../features/my/components';
import {type MyStackParamList} from '../../../navigators/MyNavigator';

interface ITerms {
  personalInfo: boolean;
  id: boolean;
}

type TTerm = keyof ITerms;

export function SettingResignationScreen(): React.JSX.Element {
  const navigation =
    useNavigation<NativeStackNavigationProp<MyStackParamList>>();

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

  return (
    <>
      <SafeAreaView style={{backgroundColor: theme.palette['gray-0']}} />
      <TopBar
        headerText="회원탈퇴"
        showBackButton
        onPressBackButton={() => {
          navigation.pop();
        }}
      />
      <StyledContainer>
        <Gap size={'10px'} />
        <ResignationAchievementCard />

        <StyledHorizontal>
          <CheckBox
            isCheck={isAllTermsChecked}
            label="안내사항을 확인하고 회원탈퇴에 동의해주세요"
            onPress={() => {
              setAllTerms(!isAllTermsChecked);
            }}
          />
        </StyledHorizontal>

        <StyledHorizontal>
          <CheckBox
            isCheck={terms.personalInfo}
            onPress={() => {
              setTerm('personalInfo', !terms.personalInfo);
            }}
          />
          <Text text="그동안 회원님의 활동, 개인 정보와 설정이 삭제돼요." />
        </StyledHorizontal>

        <Icon svgXml={checkXmlData} />
        <StyledHorizontal>
          <CheckBox isCheck={terms.id} />
          <Text text="ID가 삭제돼요." />
        </StyledHorizontal>
      </StyledContainer>
    </>
  );
}

const StyledContainer = styled.View`
  background-color: ${({theme}) => theme.palette['gray-0']};
  height: 100%;
  padding: 0 16px;
`;

const StyledHorizontal = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
