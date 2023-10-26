import React from 'react';

import styled from '@emotion/native';
import {type RouteProp, useRoute} from '@react-navigation/native';
import {SafeAreaView, View} from 'react-native';

import {MatchDetailMatchingScreen} from './matching';
import {MatchDetailMemberScreen} from './member';
import {MatchDetailProfileScreen} from './profile';
import {MatchDetailRecordScreen} from './record';
import {MatchDetailResultScreen} from './result';
import {theme} from '../../../assets/styles/theme';
import {type ITopTabScreen, TopTabNavigator} from '../../../components/Tab';
import {Text} from '../../../components/Text';
import {useGetFieldDetail} from '../../../features/match/hooks/field';
import {type MatchStackParamList} from '../../../navigators/MatchNavigator';

type TMatchDetailScreenRouteProps = RouteProp<
  MatchStackParamList,
  'MatchDetail'
>;

export const MatchDetailScreen = (): React.JSX.Element => {
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

  const getScreenByRoleAndStatus = (): ITopTabScreen[] => {
    const fieldStatus = fieldDetailData?.fieldDto?.fieldStatus;
    const userRole = fieldDetailData?.fieldDto?.fieldRole;

    const screens = [];

    if (fieldStatus === 'COMPLETED') {
      return [
        {
          name: 'TeamProfile',
          label: '프로필',
          component: () => (
            <MatchDetailProfileScreen fieldDetailData={fieldDetailData} />
          ),
        },
        {
          name: 'Result',
          label: '매칭결과',
          component: () => <MatchDetailResultScreen />,
        },
      ];
    }

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

  const screens = getScreenByRoleAndStatus();

  return (
    <>
      <SafeAreaView style={{backgroundColor: theme.palette['gray-0']}}>
        <StyledHeaderWrapper>
          <Text
            type="head3"
            fontWeight="700"
            text={fieldDetailData.fieldDto.fieldType === 'DUEL' ? '1vs1' : '팀'}
          />
        </StyledHeaderWrapper>
      </SafeAreaView>
      <TopTabNavigator size="sm" screens={screens} />
    </>
  );
};

const StyledHeaderWrapper = styled.View`
  padding: 30px 16px 10px 16px;
`;
