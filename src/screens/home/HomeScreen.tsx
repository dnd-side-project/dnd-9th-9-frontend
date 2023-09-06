import React from 'react';

import {type BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {SafeAreaView} from 'react-native';

import {
  CurrentWorkoutSection,
  TodayCalorieSection,
} from '../../features/home/components';
import {type BottomTabStackParamList} from '../../navigators';

type Props = BottomTabScreenProps<BottomTabStackParamList, 'Home'>;

export function HomeScreen({navigation}: Props): React.JSX.Element {
  return (
    <SafeAreaView>
      <TodayCalorieSection />
      <CurrentWorkoutSection />
    </SafeAreaView>
  );
}
