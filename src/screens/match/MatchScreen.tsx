import React from 'react';

import {type BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {type CompositeScreenProps} from '@react-navigation/native';
import {type NativeStackScreenProps} from '@react-navigation/native-stack';
import {SafeAreaView} from 'react-native';

import {MyMatchListTabScreen} from './MyMatchListTabScreen';
import {TotalMatchListTabScreen} from './TotalMatchListTabScreen';
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
  BottomTabScreenProps<BottomTabStackParamList, 'Match'>,
  NativeStackScreenProps<RootStackParamList>
>;

const screens: ITopTabScreen[] = [
  {
    name: 'TotalMatchListTab',
    label: '매칭',
    component: TotalMatchListTabScreen,
  },
  {
    name: 'MyMatchListTab',
    label: 'MY매칭',
    component: MyMatchListTabScreen,
  },
];

export function MatchScreen({navigation}: Props): React.JSX.Element {
  return (
    <>
      <SafeAreaView style={{backgroundColor: theme.palette['gray-0']}} />
      <TopTabNavigator screens={screens} />
    </>
  );
}
