import React from 'react';
import styled from '@emotion/native';
import {SafeAreaView} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {MatchStackParamList} from '../../../navigators/MatchNavigator';
import {Text} from '../../../components/Text';
import {theme} from '../../../assets/styles/theme';
import {MatchDetailProfileScreen} from './MatchDetailProfileScreen';
import {MatchDetailRecordScreen} from './MatchDetailRecordScreen';
import {MatchDetailMatchingScreen} from './MatchDetailMatchingScreen';
import {MatchDetailMemberScreen} from './MatchDetailMemberScreen';
import {
  ITopTabScreen,
  TopTabNavigator,
} from '../../../components/TopTabNavigator';

type TMatchDetailScreenProps = NativeStackScreenProps<
  MatchStackParamList,
  'MatchDetail'
>;

const screens: ITopTabScreen[] = [
  {
    name: 'TeamProfile',
    label: '프로필',
    component: MatchDetailProfileScreen,
  },
  {
    name: 'TeamRecord',
    label: '기록',
    component: MatchDetailRecordScreen,
  },
  {
    name: 'TeamMatching',
    label: '매칭',
    component: MatchDetailMatchingScreen,
  },
  {
    name: 'TeamMember',
    label: '팀원',
    component: MatchDetailMemberScreen,
  },
];

export const MatchDetailScreen = ({navigation}: TMatchDetailScreenProps) => {
  return (
    <>
      <SafeAreaView style={{backgroundColor: theme.palette['gray-0']}}>
        <StyledHeaderWrapper>
          <Text type="head3" fontWeight="700" text="팀" />
        </StyledHeaderWrapper>
      </SafeAreaView>
      <TopTabNavigator size="sm" screens={screens} />
    </>
  );
};

const StyledHeaderWrapper = styled.View`
  padding: 30px 16px 10px 16px;
`;
