import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {RecordsScreen} from '../screens/record';
import {
  CreateWorkoutInformationScreen,
  CreateWorkoutMemoScreen,
} from '../screens/record/create';

export type RecordStackParamList = {
  RecordMain: undefined;
  CreateWorkoutInformation: undefined;
  CreateWorkoutMemo: undefined;
};

const Stack = createNativeStackNavigator<RecordStackParamList>();

export function RecordNavigator(): React.JSX.Element {
  return (
    <Stack.Navigator initialRouteName="RecordMain">
      <Stack.Screen
        name="RecordMain"
        component={RecordsScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="CreateWorkoutInformation"
        component={CreateWorkoutInformationScreen}
        options={{
          headerTitle: '',
        }}
      />
      <Stack.Screen
        name="CreateWorkoutMemo"
        component={CreateWorkoutMemoScreen}
        options={{
          headerTitle: '팀 정보 입력',
        }}
      />
    </Stack.Navigator>
  );
}
