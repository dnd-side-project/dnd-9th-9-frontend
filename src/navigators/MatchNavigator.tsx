import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {MatchScreen} from '../screens/match';
import {
  CreateTeamProfileScreen,
  CreateTeamScreen,
} from '../screens/match/create';
import {MatchDetailScreen} from '../screens/match/detail';
import {AutoMatchScreen, MatchFilterScreen} from '../screens/match/list';

export type MatchStackParamList = {
  MatchList: undefined;
  MatchFilter: undefined;
  TeamInformation: undefined;
  TeamProfile: undefined;
  AutoMatch: undefined;
  MatchDetail: undefined;
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
        component={CreateTeamScreen}
        options={{headerTitle: '팀 정보 입력'}}
      />
      <Stack.Screen
        name="TeamProfile"
        component={CreateTeamProfileScreen}
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
      {/* TODO: 하위 스크린 MatchNavigator 에 셋팅 */}
      {/* 팀 상세 관련 스크린 (설정, 현재 팀원, 정보 수정, 프로필 수정, 알림, 기록보기, 매칭된 팀 프로필, 신청한 상대팀, 요청받은 상대팀, 방장 넘기기, 팀원 삭제, 요청 ...) */}
      {/* 자동 매칭 선택 스크린 */}
      {/* 자동 매칭 스크린 */}
    </Stack.Navigator>
  );
}
