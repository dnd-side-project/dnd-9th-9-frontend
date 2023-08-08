import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {MaterialTopTabNavigationOptions} from '@react-navigation/material-top-tabs';
import {theme} from '../../assets/styles/theme';
import {Text} from '../Text';

const Tab = createMaterialTopTabNavigator();

interface ITopTabNavigatorProps {
  screens: {
    name: string;
    label: string;
    component: React.FC<any>;
  }[];
  size?: 'sm' | 'md';
}

export function TopTabNavigator({screens, size = 'md'}: ITopTabNavigatorProps) {
  const screenOptions: MaterialTopTabNavigationOptions = {
    tabBarStyle: {
      width: size === 'sm' ? undefined : 'auto',
      height: size === 'sm' ? 60 : 80,
      justifyContent: 'flex-end',
      borderColor: theme.palette.black,
      borderBottomColor: theme.palette['gray-100'],
      borderBottomWidth: 2,
    },
    tabBarItemStyle: {
      width: size === 'sm' ? undefined : 'auto',
      height: 'auto',
      padding: size === 'sm' ? 12 : 16,
    },
    tabBarIndicatorStyle: {
      backgroundColor: theme.palette.black,
      height: 2,
      position: 'absolute',
      bottom: -2,
    },
  };

  return (
    <Tab.Navigator screenOptions={screenOptions}>
      {screens.map(screen => (
        <Tab.Screen
          key={screen.name}
          name={screen.name}
          options={{
            tabBarLabel: ({focused}) => (
              <Text
                text={screen.label}
                type={size === 'sm' ? 'body1' : 'head2'}
                color={
                  focused ? 'black' : size === 'sm' ? 'gray-600' : 'gray-200'
                }
                fontWeight="bold"
              />
            ),
          }}
          component={screen.component}
        />
      ))}
    </Tab.Navigator>
  );
}
