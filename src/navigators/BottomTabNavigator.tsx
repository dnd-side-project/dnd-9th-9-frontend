import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {MyScreen} from '../screens/my';
import {HomeScreen} from '../screens/home';
import {RecordsScreen} from '../screens/record';
import {MatchNavigator} from './MatchNavigator';

export type BottomTabStackParamList = {
  Home: undefined;
  Records: undefined;
  Match: undefined;
  My: undefined;
};

const Tab = createBottomTabNavigator<BottomTabStackParamList>();

export function BottomTabNavigator() {
  return (
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Records"
        component={RecordsScreen}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Match"
        component={MatchNavigator}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="My"
        component={MyScreen}
        options={{
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}
