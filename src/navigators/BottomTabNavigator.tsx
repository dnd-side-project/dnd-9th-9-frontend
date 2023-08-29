import React from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {MatchNavigator} from './MatchNavigator';
import {RecordNavigator} from './RecordNavigator';
import {theme} from '../assets/styles/theme';
import {
  homeXmlData,
  matchXmlData,
  myXmlData,
  recordXmlData,
} from '../assets/svg';
import {Icon} from '../components/Icon';
import {Text} from '../components/Text';
import {HomeScreen} from '../screens/home';
import {MyScreen} from '../screens/my';

export type BottomTabStackParamList = {
  Home: undefined;
  Records: undefined;
  Match: undefined;
  My: undefined;
};

const Tab = createBottomTabNavigator<BottomTabStackParamList>();

export function BottomTabNavigator(): React.JSX.Element {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      sceneContainerStyle={{
        backgroundColor: theme.palette['gray-0'],
        paddingBottom: 80,
      }}
      screenOptions={{
        tabBarStyle: {
          height: 80,
          paddingTop: 10,
          paddingBottom: 20,
          paddingHorizontal: 16,
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
          borderWidth: 1,
          borderColor: theme.palette['gray-50'],
          position: 'absolute',
        },
        tabBarActiveTintColor: theme.palette['main-300'],
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarLabel: ({focused}) => (
            <Text
              text="홈"
              type="caption"
              fontWeight="600"
              color={focused ? 'gray-950' : 'gray-600'}
            />
          ),
          tabBarIcon: ({color}) => (
            <Icon svgXml={homeXmlData} width={22} height={22} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Records"
        component={RecordNavigator}
        options={{
          headerShown: false,
          tabBarLabel: ({focused}) => (
            <Text
              text="기록"
              type="caption"
              fontWeight="600"
              color={focused ? 'gray-950' : 'gray-600'}
            />
          ),
          tabBarIcon: ({color}) => (
            <Icon svgXml={recordXmlData} width={22} height={22} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Match"
        component={MatchNavigator}
        options={{
          headerShown: false,
          tabBarLabel: ({focused}) => (
            <Text
              text="매칭"
              type="caption"
              fontWeight="600"
              color={focused ? 'gray-950' : 'gray-600'}
            />
          ),
          tabBarIcon: ({color}) => (
            <Icon svgXml={matchXmlData} width={22} height={22} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="My"
        component={MyScreen}
        options={{
          headerShown: false,
          tabBarLabel: ({focused}) => (
            <Text
              text="마이페이지"
              type="caption"
              fontWeight="600"
              color={focused ? 'gray-950' : 'gray-600'}
            />
          ),
          tabBarIcon: ({color}) => (
            <Icon svgXml={myXmlData} width={22} height={22} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
