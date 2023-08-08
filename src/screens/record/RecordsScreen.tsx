import {SafeAreaView} from 'react-native';
import {CompositeScreenProps} from '@react-navigation/native';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {BottomTabStackParamList, RootStackParamList} from '../../navigators';
import {RecordsTabScreen} from './RecordsTabScreen';
import {SummaryTabScreen} from './SummaryTabScreen';

import {ITopTabScreen, TopTabNavigator} from '../../components/TopTabNavigator';
import {theme} from '../../assets/styles/theme';

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

export function RecordsScreen({navigation}: Props) {
  return (
    <>
      <SafeAreaView style={{backgroundColor: theme.palette['gray-0']}} />
      <TopTabNavigator screens={screens} />
    </>
  );
}
