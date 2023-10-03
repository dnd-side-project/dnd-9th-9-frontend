import React from 'react';

import styled from '@emotion/native';
import {type RouteProp, useRoute} from '@react-navigation/native';
import {type NativeStackScreenProps} from '@react-navigation/native-stack';
import {SafeAreaView, View} from 'react-native';

import {MatchDetailProfileScreen} from './MatchDetailProfileScreen';
import {MatchDetailMatchingScreen} from './matching/MatchDetailMatchingScreen';
import {MatchDetailMemberScreen} from './member/MatchDetailMemberScreen';
import {MatchDetailRecordScreen} from './record';
import {theme} from '../../../assets/styles/theme';
import {Text} from '../../../components/Text';
import {
  type ITopTabScreen,
  TopTabNavigator,
} from '../../../components/TopTabNavigator';
import {useGetFieldDetail} from '../../../features/match/hooks/field';
import {type MatchStackParamList} from '../../../navigators/MatchNavigator';

type TMatchDetailScreenProps = NativeStackScreenProps<
  MatchStackParamList,
  'MatchDetail'
>;

type TMatchDetailScreenRouteProps = RouteProp<
  MatchStackParamList,
  'MatchDetail'
>;

export const MatchDetailScreen = ({
  navigation,
}: TMatchDetailScreenProps): React.JSX.Element => {
  const route = useRoute<TMatchDetailScreenRouteProps>();
  const {id} = route.params;

  // TODO: ERR 처리
  if (id === undefined) return <View></View>;

  // TODO: 다른 접근에 대해서도 처리 (생성 후 프로필 상세 등)
  const {data: fieldDetailData} = useGetFieldDetail({
    id,
  });

  // TODO: ERR 처리
  if (fieldDetailData === undefined) return <View></View>;

  const getScreenByRule = (): ITopTabScreen[] => {
    const userRole = fieldDetailData?.fieldDto?.fieldRole;

    const screens = [];

    if (userRole === 'MEMBER' || userRole === 'LEADER') {
      screens.push({
        name: 'TeamRecord',
        label: '기록',
        component: () => (
          <MatchDetailRecordScreen
            id={id}
            fieldStatus={fieldDetailData?.fieldDto?.fieldStatus}
            assignedField={fieldDetailData?.assignedFieldDto}
            fieldType={fieldDetailData?.fieldDto?.fieldType}
          />
        ),
      });
      screens.push({
        name: 'TeamMatching',
        label: '매칭',
        component: () => (
          <MatchDetailMatchingScreen
            id={id}
            assignedField={fieldDetailData?.assignedFieldDto}
            userRole={fieldDetailData?.fieldDto?.fieldRole}
          />
        ),
      });
    }

    return [
      {
        name: 'TeamProfile',
        label: '프로필',
        component: () => (
          <MatchDetailProfileScreen fieldDetailData={fieldDetailData} />
        ),
      },
      ...screens,
      {
        name: 'TeamMember',
        label: '팀원',
        component: () => (
          <MatchDetailMemberScreen id={id} userRole={userRole} />
        ),
      },
    ];
  };

  const screens = getScreenByRule();

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
