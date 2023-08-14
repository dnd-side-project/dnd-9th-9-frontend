import {SafeAreaView} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {MatchStackParamList} from '../../../navigators/MatchNavigator';
import {Text} from '../../../components/Text';

type TMatchDetailMatchingScreenProps = NativeStackScreenProps<
  MatchStackParamList,
  'MatchDetailMatching'
>;

export const MatchDetailMatchingScreen = ({
  navigation,
}: TMatchDetailMatchingScreenProps) => {
  return (
    <SafeAreaView style={{backgroundColor: '#ffffff'}}>
      <Text text="팀 상세 매칭" />
    </SafeAreaView>
  );
};
