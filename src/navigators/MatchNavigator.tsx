import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {
  type TUserRole,
  type IFieldListPaginationParams,
  type IFieldListParams,
  type IMatchDetailRecord,
  type ICreateField,
  type TStrength,
} from '../features/match/types';
import {MatchScreen} from '../screens/match';
import {
  CreateMatchInformationScreen,
  CreateMatchProfileScreen,
} from '../screens/match/create';
import {
  MatchDetailScreen,
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
import {AutoMatchScreen, MatchFilterScreen} from '../screens/match/list';

export type MatchStackParamList = {
  MatchList: IFieldListPaginationParams;
  // 필터 화면
  MatchFilter: IFieldListParams;
  // 팀 생성 화면
  TeamInformation: undefined;
  TeamProfile: undefined;
  // 자동 매칭 화면
  AutoMatch: undefined;
  // 팀 상세 화면
  MatchDetail: {
    id: number;
  };
  MatchDetailProfileSetting: {
    id: number;
  };
  UpdateInformation: Omit<
    ICreateField,
    'description' | 'rule' | 'strength' | 'name' | 'profileImg'
  > & {
    strength: TStrength;
  };
  UpdateProfile: {
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
  return (
    <Stack.Navigator initialRouteName="MatchList">
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
      <Stack.Screen name="MatchFilter" component={MatchFilterScreen} />
      <Stack.Screen
        name="TeamInformation"
        component={CreateMatchInformationScreen}
        options={{headerTitle: '팀 정보 입력'}}
      />
      <Stack.Screen
        name="TeamProfile"
        component={CreateMatchProfileScreen}
        options={{headerTitle: '팀 프로필', headerBackTitleVisible: false}}
      />
      <Stack.Screen
        name="AutoMatch"
        component={AutoMatchScreen}
        options={{headerTitle: ''}}
      />
      <Stack.Screen
        name="MatchDetail"
        component={MatchDetailScreen}
        options={{headerTitle: ''}}
      />
      <Stack.Screen
        name="MatchDetailProfileSetting"
        component={MatchDetailProfileSettingScreen}
        options={{headerTitle: ''}}
      />
      <Stack.Screen
        name="UpdateInformation"
        component={UpdateTeamInformationScreen}
        options={{headerTitle: '팀 정보 수정'}}
      />
      <Stack.Screen
        name="UpdateProfile"
        component={UpdateTeamProfileScreen}
        options={{headerTitle: '팀 프로필 수정'}}
      />
      <Stack.Screen
        name="MatchDetailRecordDetail"
        component={MatchDetailRecordDetailScreen}
        options={{headerTitle: ''}}
      />
      <Stack.Screen
        name="MatchDetailRecordSummary"
        component={MatchDetailRecordSummaryScreen}
        options={{headerTitle: ''}}
      />
      <Stack.Screen
        name="MatchDetailMatchingMore"
        component={MatchDetailMatchingMoreScreen}
        options={{headerTitle: ''}}
      />
      <Stack.Screen
        name="MatchDetailMemberMore"
        component={MatchDetailMemberMoreScreen}
        options={{headerTitle: ''}}
        initialParams={{
          type: 'REQUEST',
        }}
      />
      <Stack.Screen
        name="MatchDetailMemberRequestAccept"
        component={MatchDetailMemberRequestAcceptScreen}
        options={{headerTitle: ''}}
      />
      <Stack.Screen
        name="MatchDetailMemberAssign"
        component={MatchDetailMemberAssignScreen}
        options={{headerTitle: ''}}
      />
      <Stack.Screen
        name="MatchDetailMemberDelete"
        component={MatchDetailMemberDeleteScreen}
        options={{headerTitle: ''}}
      />
    </Stack.Navigator>
  );
}
