import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {MatchScreen} from '../screens/match';
import {
  CreateMatchInformationScreen,
  CreateMatchProfileScreen,
} from '../screens/match/create';
import {
  MatchDetailMatchingScreen,
  MatchDetailMemberScreen,
  MatchDetailProfileScreen,
  MatchDetailRecordScreen,
  MatchDetailScreen,
} from '../screens/match/detail';
import {AutoMatchScreen, MatchFilterScreen} from '../screens/match/list';

export type MatchStackParamList = {
  MatchList: undefined;
  // 필터 화면
  MatchFilter: undefined;
  // 팀 생성 화면
  TeamInformation: undefined;
  TeamProfile: undefined;
  // 자동 매칭 화면
  AutoMatch: undefined;
  // 팀 상세 화면
  MatchDetail: undefined;
  MatchDetailProfile: undefined;
  MatchDetailRecord: undefined;
  MatchDetailMatching: undefined;
  MatchDetailMember: undefined;
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
        name="MatchDetailMatching"
        component={MatchDetailMatchingScreen}
        options={{headerTitle: ''}}
      />
      <Stack.Screen
        name="MatchDetailMember"
        component={MatchDetailMemberScreen}
        options={{headerTitle: ''}}
      />
      {/* TODO: 하위 스크린 MatchNavigator 에 셋팅 */}
      {/* 팀 상세 관련 스크린 (설정, 현재 팀원, 정보 수정, 프로필 수정, 알림, 기록보기, 매칭된 팀 프로필, 신청한 상대팀, 요청받은 상대팀, 방장 넘기기, 팀원 삭제, 요청 ...) */}
      {/* 자동 매칭 선택 스크린 */}
      {/* 자동 매칭 스크린 */}
    </Stack.Navigator>
  );
}
