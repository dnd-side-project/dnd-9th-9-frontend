import {SafeAreaView, Text} from 'react-native';
import {BottomTabStackParamList, RootStackParamList} from '../../navigators';
import {CompositeScreenProps} from '@react-navigation/native';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

type Props = CompositeScreenProps<
  BottomTabScreenProps<BottomTabStackParamList, 'Match'>,
  NativeStackScreenProps<RootStackParamList>
>;

export function MatchesScreen({navigation}: Props) {
  return (
    <SafeAreaView>
      <Text>MatchesScreen</Text>
    </SafeAreaView>
  );
}
