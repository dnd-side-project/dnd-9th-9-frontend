import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {RecordsScreen} from '../screens/record';
import {HomeScreen} from '../screens/home';
import {MatchScreen} from '../screens/match';
import {MyScreen} from '../screens/my';

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
        component={MatchScreen}
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
