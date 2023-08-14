import {SafeAreaView} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {MatchStackParamList} from '../../../navigators/MatchNavigator';
import {Text} from '../../../components/Text';

type TMatchDetailScreenProps = NativeStackScreenProps<
  MatchStackParamList,
  'MatchDetail'
>;

export const MatchDetailScreen = ({navigation}: TMatchDetailScreenProps) => {
  return (
    <SafeAreaView style={{backgroundColor: '#ffffff'}}>
      <Text text="팀 상세" />
    </SafeAreaView>
  );
};
