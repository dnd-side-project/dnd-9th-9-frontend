import React from 'react';

import styled from '@emotion/native';
import {type NativeStackScreenProps} from '@react-navigation/native-stack';
import {SafeAreaView} from 'react-native';

import {MatchDetailMatchingScreen} from './MatchDetailMatchingScreen';
import {MatchDetailMemberScreen} from './MatchDetailMemberScreen';
import {MatchDetailProfileScreen} from './MatchDetailProfileScreen';
import {MatchDetailRecordScreen} from './record';
import {theme} from '../../../assets/styles/theme';
import {Text} from '../../../components/Text';
import {
  type ITopTabScreen,
  TopTabNavigator,
} from '../../../components/TopTabNavigator';
import {type MatchStackParamList} from '../../../navigators/MatchNavigator';

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

export const MatchDetailScreen = ({
  navigation,
}: TMatchDetailScreenProps): React.JSX.Element => {
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
