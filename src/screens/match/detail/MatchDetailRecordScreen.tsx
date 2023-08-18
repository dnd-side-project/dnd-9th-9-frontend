import React from 'react';

import {type NativeStackScreenProps} from '@react-navigation/native-stack';
import {SafeAreaView} from 'react-native';

import {Text} from '../../../components/Text';
import {type MatchStackParamList} from '../../../navigators/MatchNavigator';

type TMatchDetailRecordScreenProps = NativeStackScreenProps<
  MatchStackParamList,
  'MatchDetailRecord'
>;

export const MatchDetailRecordScreen = ({
  navigation,
}: TMatchDetailRecordScreenProps): React.JSX.Element => {
  return (
    <SafeAreaView style={{backgroundColor: '#ffffff'}}>
      <Text text="팀 상세 기록" />
    </SafeAreaView>
  );
};
