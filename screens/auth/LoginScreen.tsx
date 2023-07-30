import {SafeAreaView, Text, Button} from 'react-native';
import {RootStackParamList} from '../../navigators';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

export function LoginScreen({navigation}: Props) {
  return (
    <SafeAreaView>
      <Text>LoginScreen</Text>
      <Button title="기록하기" onPress={() => navigation.replace('Main')} />
    </SafeAreaView>
  );
}
