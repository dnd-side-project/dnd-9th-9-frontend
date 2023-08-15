import React from 'react';

import {type BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {SafeAreaView} from 'react-native';

import {RecordsTabScreen} from './RecordsTabScreen';
import {SummaryTabScreen} from './SummaryTabScreen';
import {theme} from '../../assets/styles/theme';
import {
  type ITopTabScreen,
  TopTabNavigator,
} from '../../components/TopTabNavigator';
import {type BottomTabStackParamList} from '../../navigators';

type Props = BottomTabScreenProps<BottomTabStackParamList, 'Records'>;

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
