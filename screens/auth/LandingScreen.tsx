import {Button, Text, SafeAreaView} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../navigators';

type Props = NativeStackScreenProps<RootStackParamList, 'Landing'>;

export function LandingScreen({navigation}: Props) {
  return (
    <SafeAreaView>
      <Text>LandingScreen</Text>
      <Button title="로그인" onPress={() => navigation.push('Login')} />
      <Button title="회원가입" onPress={() => navigation.push('Signup')} />
    </SafeAreaView>
  );
}
