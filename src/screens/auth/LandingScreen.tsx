import {SafeAreaView} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../navigators';
import {Text} from '../../components/Text';
import {Button} from '../../components/Button';

type Props = NativeStackScreenProps<RootStackParamList, 'Landing'>;

export function LandingScreen({navigation}: Props) {
  return (
    <SafeAreaView>
      <Text text="TITLE TEST 1" type="head1" />
      <Text text="TITLE TEST 2" type="head2" />
      <Text text="TITLE TEST 3" type="head3" />

      <Button
        text="로그인"
        size="sm"
        disabled={true}
        onPress={() => navigation.push('Login')}
      />
      <Button
        text="회원가입"
        size="md"
        disabled={false}
        onPress={() => navigation.push('Signup')}
      />
    </SafeAreaView>
  );
}
