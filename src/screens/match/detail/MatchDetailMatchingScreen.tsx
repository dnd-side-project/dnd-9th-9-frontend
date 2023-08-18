import React from 'react';

import {type NativeStackScreenProps} from '@react-navigation/native-stack';
import {SafeAreaView} from 'react-native';

import {Text} from '../../../components/Text';
import {type MatchStackParamList} from '../../../navigators/MatchNavigator';

type TMatchDetailMatchingScreenProps = NativeStackScreenProps<
  MatchStackParamList,
  'MatchDetailMatching'
>;

export const MatchDetailMatchingScreen = ({
  navigation,
}: TMatchDetailMatchingScreenProps): React.JSX.Element => {
  return (
    <SafeAreaView style={{backgroundColor: '#ffffff'}}>
      <Text text="팀 상세 매칭" />
    </SafeAreaView>
  );
};
