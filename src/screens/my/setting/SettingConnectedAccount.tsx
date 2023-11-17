import React from 'react';

import styled from '@emotion/native';
import {useNavigation} from '@react-navigation/native';
import {type NativeStackNavigationProp} from '@react-navigation/native-stack';
import {SafeAreaView} from 'react-native';

import {theme} from '../../../assets/styles/theme';
import {Line} from '../../../components/Line';
import {Text} from '../../../components/Text';
import {TopBar} from '../../../components/TopBar';
import {ConnectedAccount} from '../../../features/my/components';
import {type MyStackParamList} from '../../../navigators/MyNavigator';

export const SettingConnectedAccount = (): React.JSX.Element => {
  const navigation =
    useNavigation<NativeStackNavigationProp<MyStackParamList>>();

  return (
    <>
      <SafeAreaView style={{backgroundColor: theme.palette['gray-0']}} />
      <TopBar
        showBackButton
        onPressBackButton={() => {
          navigation.pop();
        }}
        headerText="연결된 계정"
      />

      <StyledContainer>
        <ConnectedAccount loginType={'APPLE'} />

        <Line size="sm" color="gray-200" />

        <StyledTouchable
          onPress={() => {
            navigation.navigate('SettingResignation');
          }}>
          <Text text="회원탈퇴" color="error-light" />
        </StyledTouchable>
      </StyledContainer>
    </>
  );
};

const StyledContainer = styled.View`
  background-color: ${({theme}) => theme.palette['gray-0']};
  flex: 1;
  padding: 0 16px;
`;

const StyledTouchable = styled.TouchableOpacity`
  padding: 18px 0;
  background-color: ${({theme}) => theme.palette['gray-0']};
`;
