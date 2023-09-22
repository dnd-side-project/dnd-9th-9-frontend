import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {
  type TUserRole,
  type IFieldListPaginationParams,
  type IFieldListParams,
  type IMatchDetailRecord,
} from '../features/match/types';
import {MatchScreen} from '../screens/match';
import {
  CreateMatchInformationScreen,
  CreateMatchProfileScreen,
} from '../screens/match/create';
import {
  MatchDetailMatchingMoreScreen,
  MatchDetailMatchingScreen,
  MatchDetailMemberScreen,
  MatchDetailProfileScreen,
  MatchDetailRecordDetailScreen,
  MatchDetailRecordScreen,
  MatchDetailScreen,
  MatchDetailMemberRequestAcceptScreen,
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
  MatchDetailProfile: {
    id: number;
  };
  MatchDetailRecord: undefined;
  MatchDetailRecordDetail: IMatchDetailRecord;
  MatchDetailMatching: undefined;
  MatchDetailMatchingMore: {
    type: 'RECEIVED' | 'SENT';
  };
  MatchDetailMember: undefined;
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
          page: 0,
          size: 10,
          fieldType: 'DUEL',
          goal: [],
          memberCount: null,
          period: [],
          skillLevel: [],
          strength: [],
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
        name="MatchDetailProfile"
        component={MatchDetailProfileScreen}
        options={{headerTitle: ''}}
      />
      <Stack.Screen
        name="MatchDetailRecord"
        component={MatchDetailRecordScreen}
        options={{headerTitle: ''}}
      />
      <Stack.Screen
        name="MatchDetailRecordDetail"
        component={MatchDetailRecordDetailScreen}
        options={{headerTitle: ''}}
      />
      <Stack.Screen
        name="MatchDetailMatching"
        component={MatchDetailMatchingScreen}
        options={{headerTitle: ''}}
      />
      <Stack.Screen
        name="MatchDetailMatchingMore"
        component={MatchDetailMatchingMoreScreen}
        options={{headerTitle: ''}}
      />
      <Stack.Screen
        name="MatchDetailMember"
        component={MatchDetailMemberScreen}
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
      {/* TODO: 하위 스크린 MatchNavigator 에 셋팅 */}
      {/* 팀 상세 관련 스크린 (설정, 현재 팀원, 정보 수정, 프로필 수정, 알림, 기록보기, 매칭된 팀 프로필, 신청한 상대팀, 요청받은 상대팀, 방장 넘기기, 팀원 삭제, 요청 ...) */}
      {/* 자동 매칭 선택 스크린 */}
      {/* 자동 매칭 스크린 */}
    </Stack.Navigator>
  );
}
