import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {BottomTabNavigator} from './BottomTabNavigator';
import {LandingScreen, LoginScreen, SignupScreen} from '../screens/auth';

export type RootStackParamList = {
  Landing: undefined;
  Login: undefined;
  Signup: undefined;
  Main: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export function AppNavigator(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Landing">
        <Stack.Screen
          name="Landing"
          component={LandingScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen
          name="Signup"
          component={SignupScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Main"
          component={BottomTabNavigator}
          options={{
            headerShown: false,
            headerBackVisible: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
