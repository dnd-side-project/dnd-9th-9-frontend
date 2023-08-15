import React from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {MatchNavigator} from './MatchNavigator';
import {HomeScreen} from '../screens/home';
import {MyScreen} from '../screens/my';
import {RecordsScreen} from '../screens/record';

export type BottomTabStackParamList = {
  Home: undefined;
  Records: undefined;
  Match: undefined;
  My: undefined;
};

const Tab = createBottomTabNavigator<BottomTabStackParamList>();

export function BottomTabNavigator(): React.JSX.Element {
  return (
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Records"
        component={RecordsScreen}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Match"
        component={MatchNavigator}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="My"
        component={MyScreen}
        options={{
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}
