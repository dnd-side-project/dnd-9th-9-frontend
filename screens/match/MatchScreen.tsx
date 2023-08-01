import {SafeAreaView} from 'react-native';
import {CompositeScreenProps} from '@react-navigation/native';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import {BottomTabStackParamList, RootStackParamList} from '../../navigators';

import {TotalMatchListTabScreen} from './TotalMatchListTabScreen';
import {MyMatchListTabScreen} from './MyMatchListTabScreen';

type Props = CompositeScreenProps<
  BottomTabScreenProps<BottomTabStackParamList, 'Match'>,
  NativeStackScreenProps<RootStackParamList>
>;

const Tab = createMaterialTopTabNavigator();

export function MatchScreen({navigation}: Props) {
  return (
    <>
      <SafeAreaView style={{backgroundColor: '#ffffff'}} />
      <Tab.Navigator>
        <Tab.Screen
          name="TotalMatchListTab"
          options={{
            tabBarLabel: '매칭',
          }}
          component={TotalMatchListTabScreen}
        />
        <Tab.Screen
          name="MyMatchListTab"
          options={{
            tabBarLabel: 'My매칭',
          }}
          component={MyMatchListTabScreen}
        />
      </Tab.Navigator>
    </>
  );
}
