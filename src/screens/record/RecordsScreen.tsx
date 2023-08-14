import React from 'react';

import {type BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {type CompositeScreenProps} from '@react-navigation/native';
import {type NativeStackScreenProps} from '@react-navigation/native-stack';
import {SafeAreaView} from 'react-native';

import {RecordsTabScreen} from './RecordsTabScreen';
import {SummaryTabScreen} from './SummaryTabScreen';
import {theme} from '../../assets/styles/theme';
import {
  type ITopTabScreen,
  TopTabNavigator,
} from '../../components/TopTabNavigator';
import {
  type BottomTabStackParamList,
  type RootStackParamList,
} from '../../navigators';

type Props = CompositeScreenProps<
  BottomTabScreenProps<BottomTabStackParamList, 'Records'>,
  NativeStackScreenProps<RootStackParamList>
>;

const screens: ITopTabScreen[] = [
  {
    name: 'RecordsTab',
    label: '운동 기록',
    component: RecordsTabScreen,
  },
  {
    name: 'SummaryTab',
    label: '요약',
    component: SummaryTabScreen,
  },
];

export function RecordsScreen({navigation}: Props): React.JSX.Element {
  return (
    <>
      <SafeAreaView style={{backgroundColor: theme.palette['gray-0']}} />
      <TopTabNavigator screens={screens} />
    </>
  );
}
