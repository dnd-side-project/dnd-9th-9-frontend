import React from 'react';

import {type NativeStackScreenProps} from '@react-navigation/native-stack';
import {SafeAreaView} from 'react-native';

import {Text} from '../../../components/Text';
import {type MatchStackParamList} from '../../../navigators/MatchNavigator';

type TMatchDetailMemberScreenProps = NativeStackScreenProps<
  MatchStackParamList,
  'MatchDetailMember'
>;

export const MatchDetailMemberScreen = ({
  navigation,
}: TMatchDetailMemberScreenProps): React.JSX.Element => {
  return (
    <SafeAreaView style={{backgroundColor: '#ffffff'}}>
      <Text text="팀 상세 맴버" />
    </SafeAreaView>
  );
};
