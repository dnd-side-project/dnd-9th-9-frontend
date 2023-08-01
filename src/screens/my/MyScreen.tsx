import {SafeAreaView, Text} from 'react-native';
import {BottomTabStackParamList, RootStackParamList} from '../../navigators';
import {CompositeScreenProps} from '@react-navigation/native';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

type Props = CompositeScreenProps<
  BottomTabScreenProps<BottomTabStackParamList, 'My'>,
  NativeStackScreenProps<RootStackParamList>
>;

export function MyScreen({navigation}: Props) {
  return (
    <SafeAreaView>
      <Text>MyScreen</Text>
    </SafeAreaView>
  );
}
