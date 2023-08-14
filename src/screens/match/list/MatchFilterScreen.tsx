import {SafeAreaView} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {MatchStackParamList} from '../../../navigators/MatchNavigator';
import {Text} from '../../../components/Text';

type TMatchFilterScreenProps = NativeStackScreenProps<
  MatchStackParamList,
  'MatchFilter'
>;

export const MatchFilterScreen = ({navigation}: TMatchFilterScreenProps) => {
  return (
    <SafeAreaView style={{backgroundColor: '#ffffff'}}>
      <Text text="필터" />
    </SafeAreaView>
  );
};
