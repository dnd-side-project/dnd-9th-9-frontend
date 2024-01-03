import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {
  MyProfileModifyScreen,
  MyProfileScreen,
  MyScreen,
  TeamworkRateInfo,
  TeamworkRateHistory,
  type TMyProfileModifyScreenSectionType,
} from '../screens/my';
import {
  SettingResignationScreen,
  SettingScreen,
  SettingConnectedAccount,
} from '../screens/my/setting';

export type MyStackParamList = {
  MyMain: undefined;
  MyProfile: undefined;
  MyProfileModify: {
    type: TMyProfileModifyScreenSectionType;
  };
  Setting: undefined;
  SettingNotification: undefined;
  SettingConnectedAccount: undefined;
  SettingResignation: undefined;
  TeamworkRateInfo: undefined;
  TeamworkRateHistory: undefined;
};

const Stack = createNativeStackNavigator<MyStackParamList>();

export function MyNavigator(): React.JSX.Element {
  return (
    <Stack.Navigator
      initialRouteName="MyMain"
      screenOptions={{
        headerBackTitleVisible: false,
        headerShadowVisible: false,
      }}>
      <Stack.Screen
        name="MyMain"
        component={MyScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="MyProfile"
        component={MyProfileScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="MyProfileModify"
        component={MyProfileModifyScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Setting"
        component={SettingScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SettingResignation"
        component={SettingResignationScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SettingConnectedAccount"
        component={SettingConnectedAccount}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="TeamworkRateInfo"
        component={TeamworkRateInfo}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="TeamworkRateHistory"
        component={TeamworkRateHistory}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
