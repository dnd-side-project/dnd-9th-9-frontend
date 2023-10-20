import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {BottomTabNavigator} from './BottomTabNavigator';
import {
  LandingScreen,
  LoginScreen,
  SignupScreen,
  PhysicalInfoScreen,
} from '../screens/auth';
import {FindIdScreen} from '../screens/auth/FindIdScreen';
import {FindPasswordScreen} from '../screens/auth/FindPasswordScreen';

export type RootStackParamList = {
  Landing: undefined;
  Login: undefined;
  Signup: undefined;
  PhysicalInfoScreen: undefined;
  FindId: undefined;
  FindPassword: undefined;
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
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Signup"
          component={SignupScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="PhysicalInfoScreen"
          component={PhysicalInfoScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="FindId"
          component={FindIdScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="FindPassword"
          component={FindPasswordScreen}
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
