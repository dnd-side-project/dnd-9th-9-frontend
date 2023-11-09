import React from 'react';

import {type NativeStackScreenProps} from '@react-navigation/native-stack';
import {ScrollView} from 'react-native';

import {theme} from '../../assets/styles/theme';
import {
  CurrentWorkoutSection,
  TodayCalorieSection,
  MainBanner,
  MatchPreviewSection,
} from '../../features/home/components';
import {type HomeStackParamList} from '../../navigators';

type Props = NativeStackScreenProps<HomeStackParamList, 'HomeMain'>;

export function HomeScreen({navigation}: Props): React.JSX.Element {
  return (
    <ScrollView style={{backgroundColor: theme.palette['gray-0']}}>
      <MainBanner />
      <TodayCalorieSection />
      <MatchPreviewSection />
      <CurrentWorkoutSection />
    </ScrollView>
  );
}
