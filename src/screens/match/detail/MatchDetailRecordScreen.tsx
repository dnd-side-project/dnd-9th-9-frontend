import {SafeAreaView} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {MatchStackParamList} from '../../../navigators/MatchNavigator';
import {Text} from '../../../components/Text';

type TMatchDetailRecordScreenProps = NativeStackScreenProps<
  MatchStackParamList,
  'MatchDetailRecord'
>;

export const MatchDetailRecordScreen = ({
  navigation,
}: TMatchDetailRecordScreenProps) => {
  return (
    <SafeAreaView style={{backgroundColor: '#ffffff'}}>
      <Text text="팀 상세 기록" />
    </SafeAreaView>
  );
};
