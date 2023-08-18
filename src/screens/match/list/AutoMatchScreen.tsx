import React = require('react');

import {type NativeStackScreenProps} from '@react-navigation/native-stack';
import {SafeAreaView} from 'react-native';

import {Text} from '../../../components/Text';
import {type MatchStackParamList} from '../../../navigators/MatchNavigator';
type TAutoMatchScreenProps = NativeStackScreenProps<
  MatchStackParamList,
  'AutoMatch'
>;

export const AutoMatchScreen = ({
  navigation,
}: TAutoMatchScreenProps): React.JSX.Element => {
  return (
    <SafeAreaView style={{backgroundColor: '#ffffff'}}>
      <Text text="자동 매칭" />
    </SafeAreaView>
  );
};
