import {SafeAreaView} from 'react-native';
import {CompositeScreenProps} from '@react-navigation/native';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import {BottomTabStackParamList, RootStackParamList} from '../../navigators';

import {RecordsTabScreen} from './RecordsTabScreen';
import {SummaryTabScreen} from './SummaryTabScreen';

type Props = CompositeScreenProps<
  BottomTabScreenProps<BottomTabStackParamList, 'Records'>,
  NativeStackScreenProps<RootStackParamList>
>;

const Tab = createMaterialTopTabNavigator();

export function RecordsScreen({navigation}: Props) {
  return (
    <>
      <SafeAreaView style={{backgroundColor: '#ffffff'}} />
      <Tab.Navigator>
        <Tab.Screen
          name="RecordsTab"
          options={{
            tabBarLabel: '운동 기록',
          }}
          component={RecordsTabScreen}
        />
        <Tab.Screen
          name="SummaryTab"
          options={{
            tabBarLabel: '요약',
          }}
          component={SummaryTabScreen}
        />
      </Tab.Navigator>
    </>
  );
}
