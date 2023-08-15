import React from 'react';

import {type NativeStackScreenProps} from '@react-navigation/native-stack';
import {SafeAreaView} from 'react-native';

import {Text} from '../../../components/Text';
import {type MatchStackParamList} from '../../../navigators/MatchNavigator';
type TMatchFilterScreenProps = NativeStackScreenProps<
  MatchStackParamList,
  'MatchFilter'
>;

export const MatchFilterScreen = ({
  navigation,
}: TMatchFilterScreenProps): React.JSX.Element => {
  return (
    <SafeAreaView style={{backgroundColor: '#ffffff'}}>
      <Text text="필터" />
    </SafeAreaView>
  );
};
