import {SafeAreaView} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {MatchStackParamList} from '../../../navigators/MatchNavigator';
import {Text} from '../../../components/Text';

type TAutoMatchScreenProps = NativeStackScreenProps<
  MatchStackParamList,
  'AutoMatch'
>;

export const AutoMatchScreen = ({navigation}: TAutoMatchScreenProps) => {
  return (
    <SafeAreaView style={{backgroundColor: '#ffffff'}}>
      <Text text="자동 매칭" />
    </SafeAreaView>
  );
};
