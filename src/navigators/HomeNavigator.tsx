import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {HomeScreen, NotificationScreen} from '../screens/home';

export type HomeStackParamList = {
  HomeMain: undefined;
  Notification: undefined;
};

const Stack = createNativeStackNavigator<HomeStackParamList>();

export function HomeNavigator(): React.JSX.Element {
  return (
    <Stack.Navigator initialRouteName="HomeMain">
      <Stack.Screen
        name="HomeMain"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Notification"
        component={NotificationScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
