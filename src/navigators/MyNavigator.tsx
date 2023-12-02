import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {
  MyProfileModifyScreen,
  MyProfileScreen,
  MyScreen,
  TeamWorkRateInfo,
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
  TeamWorkRateInfo: undefined;
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
        name="TeamWorkRateInfo"
        component={TeamWorkRateInfo}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
