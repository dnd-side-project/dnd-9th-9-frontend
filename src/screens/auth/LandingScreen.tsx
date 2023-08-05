import {SafeAreaView} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import useStore from '../../store/client/useStore';
import {Text} from '../../components/Text';
import {Button} from '../../components/Button';
import {RootStackParamList} from '../../navigators';

type Props = NativeStackScreenProps<RootStackParamList, 'Landing'>;

export function LandingScreen({navigation}: Props) {
  const {counter, increase, decrease} = useStore();

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

      <Text text="Store TEST " type="head1" />
      <Text text={`${counter} ♪`} type="head2" />
      <Button text="증가" onPress={increase} />
      <Button text="감소" onPress={decrease} />
    </SafeAreaView>
  );
}
