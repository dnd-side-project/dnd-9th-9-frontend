import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {
  MyProfileModifyScreen,
  MyProfileScreen,
  MyScreen,
  type TMyProfileModifyScreenSectionType,
} from '../screens/my';

export type MyStackParamList = {
  MyMain: undefined;
  MyProfile: undefined;
  MyProfileModify: {
    type: TMyProfileModifyScreenSectionType;
  };
  Setting: undefined;
  SettingNotification: undefined;
  SettingSocialSns: undefined;
  SettingResignation: undefined;
};

const Stack = createNativeStackNavigator<MyStackParamList>();

export function MyNavigator(): React.JSX.Element {
  return (
    <Stack.Navigator initialRouteName="MyMain">
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
    </Stack.Navigator>
  );
}
