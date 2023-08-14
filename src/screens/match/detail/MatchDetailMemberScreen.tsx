import {SafeAreaView} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {MatchStackParamList} from '../../../navigators/MatchNavigator';
import {Text} from '../../../components/Text';

type TMatchDetailMemberScreenProps = NativeStackScreenProps<
  MatchStackParamList,
  'MatchDetailMember'
>;

export const MatchDetailMemberScreen = ({
  navigation,
}: TMatchDetailMemberScreenProps) => {
  return (
    <SafeAreaView style={{backgroundColor: '#ffffff'}}>
      <Text text="팀 상세 맴버" />
    </SafeAreaView>
  );
};
