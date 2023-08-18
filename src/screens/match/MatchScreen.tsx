import React from 'react';

import {type MaterialTopTabScreenProps} from '@react-navigation/material-top-tabs';
import {SafeAreaView} from 'react-native';

import {MatchListScreen} from './list/MatchListScreen';
import {MyMatchListTabScreen} from './MyMatchListTabScreen';
import {theme} from '../../assets/styles/theme';
import {
  type ITopTabScreen,
  TopTabNavigator,
} from '../../components/TopTabNavigator';
import {type MatchStackParamList} from '../../navigators';

type Props = MaterialTopTabScreenProps<MatchStackParamList, 'MatchList'>;

const screens: ITopTabScreen[] = [
  {
    name: 'TotalMatchListTab',
    label: '매칭',
    component: MatchListScreen,
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
