import {SafeAreaView, Text, Button} from 'react-native';
import {BottomTabStackParamList, RootStackParamList} from '../../navigators';
import {CompositeScreenProps} from '@react-navigation/native';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

type Props = CompositeScreenProps<
  BottomTabScreenProps<BottomTabStackParamList, 'Records'>,
  NativeStackScreenProps<RootStackParamList>
>;

export function RecordsScreen({navigation}: Props) {
  return (
    <SafeAreaView>
      <Text>RecordsScreen</Text>
      <Button title="건강앱 연동하기" />
    </SafeAreaView>
  );
}
