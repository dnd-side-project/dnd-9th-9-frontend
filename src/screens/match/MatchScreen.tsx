import {SafeAreaView} from 'react-native';
import {CompositeScreenProps} from '@react-navigation/native';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {BottomTabStackParamList, RootStackParamList} from '../../navigators';

import {TotalMatchListTabScreen} from './TotalMatchListTabScreen';
import {MyMatchListTabScreen} from './MyMatchListTabScreen';

import {TopTabNavigator} from '../../components/TopTabNavigator';
import {theme} from '../../assets/styles/theme';

type Props = CompositeScreenProps<
  BottomTabScreenProps<BottomTabStackParamList, 'Match'>,
  NativeStackScreenProps<RootStackParamList>
>;

const screens = [
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

export function MatchScreen({navigation}: Props) {
  return (
    <>
      <SafeAreaView style={{backgroundColor: theme.palette['gray-0']}} />
      <TopTabNavigator screens={screens} />
    </>
  );
}
