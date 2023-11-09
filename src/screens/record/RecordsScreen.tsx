import React from 'react';

import {type NativeStackScreenProps} from '@react-navigation/native-stack';
import {SafeAreaView} from 'react-native';

import {RecordsTabScreen} from './RecordsTabScreen';
import {SummaryTabScreen} from './SummaryTabScreen';
import {theme} from '../../assets/styles/theme';
import {Button} from '../../components/Button';
import {type ITopTabScreen, TopTabNavigator} from '../../components/Tab';
import {type RecordStackParamList} from '../../navigators/RecordNavigator';

type Props = NativeStackScreenProps<RecordStackParamList, 'RecordMain'>;

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
      {/* TODO: 연동되지 않은 유저 case */}
      <Button
        text="운동 기록하기"
        onPress={() => {
          navigation.navigate('CreateWorkoutInformation');
        }}
      />
    </>
  );
}
