import React from 'react';

import {
  type RouteProp,
  useRoute,
  useNavigation,
} from '@react-navigation/native';
import {
  type NativeStackNavigationProp,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import {TouchableOpacity} from 'react-native';

import {detailAlarmXmlData} from '../assets/svg';
import {HeaderBackButton, HeaderTitle} from '../components/Header';
import {Icon} from '../components/Icon';
import {useGetFieldDetail} from '../features/match/hooks/field';
import {
  type TUserRole,
  type IFieldListPaginationParams,
  type IFieldListParams,
  type IMatchDetailRecord,
  type TStrength,
  type IField,
} from '../features/match/types';
import {
  MatchScreen,
  AutoMatchScreen,
  AutoMatchResultScreen,
} from '../screens/match';
import {
  CreateMatchInformationScreen,
  CreateMatchProfileScreen,
} from '../screens/match/create';
import {
  MatchDetailScreen,
  MatchDetailNotificationScreen,
  MatchDetailMatchingMoreScreen,
  MatchDetailRecordDetailScreen,
  MatchDetailMemberRequestAcceptScreen,
  MatchDetailRecordSummaryScreen,
  MatchDetailProfileSettingScreen,
  UpdateTeamInformationScreen,
  UpdateTeamProfileScreen,
} from '../screens/match/detail';
import {
  MatchDetailMemberAssignScreen,
  MatchDetailMemberDeleteScreen,
  MatchDetailMemberMoreScreen,
} from '../screens/match/detail/member';
import {MatchFilterScreen} from '../screens/match/list';

export type MatchStackParamList = {
  MatchList: IFieldListPaginationParams;
  MatchFilter: IFieldListParams;
  TeamInformation: undefined;
  TeamProfile: undefined;
  AutoMatch: undefined;
  AutoMatchResult: {
    fieldType: 'DUEL' | 'TEAM_BATTLE';
  };
  MatchDetail: {
    id: number;
  };
  MatchDetailNotification: {
    id: number;
  };
  MatchDetailProfileSetting: {
    id: number;
  };
  UpdateInformation: Omit<
    IField,
    'description' | 'rule' | 'strength' | 'name' | 'profileImg' | 'currentSize'
  > & {
    strength: TStrength;
  };
  UpdateProfile: {
    id: number;
    profileImg: string;
    name: string;
    description: string;
    rule: string;
  };
  MatchDetailRecordDetail: IMatchDetailRecord;
  MatchDetailRecordSummary: {
    date: string;
    fieldSide: 'HOME' | 'AWAY';
    id: number;
  };
  MatchDetailMatchingMore: {
    id: number;
    type: 'RECEIVED' | 'SENT';
    userRole: TUserRole;
  };
  MatchDetailMemberMore: {
    id: number;
    userRole: TUserRole;
    type: 'MEMBER' | 'REQUEST';
  };
  MatchDetailMemberRequestAccept: {
    id: number;
    userRole: TUserRole;
  };
  MatchDetailMemberDelete: {
    id: number;
    userRole: TUserRole;
  };
  MatchDetailMemberAssign: {
    id: number;
    userRole: TUserRole;
  };
};

const Stack = createNativeStackNavigator<MatchStackParamList>();

export function MatchNavigator(): React.JSX.Element {
  const navigation =
    useNavigation<NativeStackNavigationProp<MatchStackParamList>>();

  return (
    <Stack.Navigator
      initialRouteName="MatchList"
      screenOptions={{
        headerBackTitleVisible: false,
        headerShadowVisible: false,
        headerTitle: () => <HeaderTitle />,
        headerLeft: () => <HeaderBackButton />,
      }}>
      <Stack.Screen
        name="MatchList"
        component={MatchScreen}
        options={{
          headerShown: false,
        }}
        initialParams={{
          fieldId: null,
          page: 0,
          size: 10,
          fieldType: 'DUEL',
          goal: [],
          memberCount: null,
          period: [],
          skillLevel: [],
          strength: [],
          matchStatus: 'APPLICATION',
        }}
      />
      <Stack.Screen
        name="MatchFilter"
        component={MatchFilterScreen}
        options={{
          headerTitle: () => <HeaderTitle title="매칭 필터" />,
        }}
      />
      <Stack.Screen
        name="TeamInformation"
        component={CreateMatchInformationScreen}
        options={{
          headerTitle: () => <HeaderTitle title="팀 정보 입력" />,
        }}
      />
      <Stack.Screen
        name="TeamProfile"
        component={CreateMatchProfileScreen}
        options={{
          headerTitle: () => <HeaderTitle title="팀 프로필" />,
        }}
      />
      <Stack.Screen name="AutoMatch" component={AutoMatchScreen} />
      <Stack.Screen name="AutoMatchResult" component={AutoMatchResultScreen} />
      <Stack.Screen
        name="MatchDetail"
        component={MatchDetailScreen}
        options={{
          headerRight: () => {
            const route =
              useRoute<RouteProp<MatchStackParamList, 'MatchDetail'>>();
            const id = route.params.id;

            const {data: fieldDetailData} = useGetFieldDetail({
              id,
            });

            const userRole = fieldDetailData?.fieldDto?.fieldRole;
            const isMatchMember =
              userRole === 'LEADER' || userRole === 'MEMBER';

            if (isMatchMember)
              return (
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('MatchDetailNotification', {
                      id,
                    });
                  }}
                  style={{marginRight: 4}}>
                  <Icon svgXml={detailAlarmXmlData} width={24} height={24} />
                </TouchableOpacity>
              );
          },
        }}
      />
      <Stack.Screen
        name="MatchDetailNotification"
        component={MatchDetailNotificationScreen}
        options={{
          headerTitle: () => <HeaderTitle title="알림" />,
        }}
      />
      <Stack.Screen
        name="MatchDetailProfileSetting"
        component={MatchDetailProfileSettingScreen}
      />
      <Stack.Screen
        name="UpdateInformation"
        component={UpdateTeamInformationScreen}
        options={{
          headerTitle: () => <HeaderTitle title="팀 정보 수정" />,
        }}
      />
      <Stack.Screen
        name="UpdateProfile"
        component={UpdateTeamProfileScreen}
        options={{
          headerTitle: () => <HeaderTitle title="팀 프로필 수정" />,
        }}
      />
      <Stack.Screen
        name="MatchDetailRecordDetail"
        component={MatchDetailRecordDetailScreen}
      />
      <Stack.Screen
        name="MatchDetailRecordSummary"
        component={MatchDetailRecordSummaryScreen}
      />
      <Stack.Screen
        name="MatchDetailMatchingMore"
        component={MatchDetailMatchingMoreScreen}
      />
      <Stack.Screen
        name="MatchDetailMemberMore"
        component={MatchDetailMemberMoreScreen}
        initialParams={{
          type: 'REQUEST',
        }}
      />
      <Stack.Screen
        name="MatchDetailMemberRequestAccept"
        component={MatchDetailMemberRequestAcceptScreen}
      />
      <Stack.Screen
        name="MatchDetailMemberAssign"
        component={MatchDetailMemberAssignScreen}
      />
      <Stack.Screen
        name="MatchDetailMemberDelete"
        component={MatchDetailMemberDeleteScreen}
      />
    </Stack.Navigator>
  );
}
