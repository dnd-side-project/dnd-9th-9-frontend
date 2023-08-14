import React from 'react';

import {type BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {type CompositeScreenProps} from '@react-navigation/native';
import {type NativeStackScreenProps} from '@react-navigation/native-stack';
import {SafeAreaView, Text} from 'react-native';

import {
  type BottomTabStackParamList,
  type RootStackParamList,
} from '../../navigators';

type Props = CompositeScreenProps<
  BottomTabScreenProps<BottomTabStackParamList, 'Home'>,
  NativeStackScreenProps<RootStackParamList>
>;

export function HomeScreen({navigation}: Props): React.JSX.Element {
  return (
    <SafeAreaView>
      <Text>HomeScreen</Text>
    </SafeAreaView>
  );
}
