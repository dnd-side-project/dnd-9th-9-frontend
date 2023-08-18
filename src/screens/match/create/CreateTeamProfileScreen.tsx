import React from 'react';

import {type NativeStackScreenProps} from '@react-navigation/native-stack';
import {SafeAreaView} from 'react-native';

import {Text} from '../../../components/Text';
import {type MatchStackParamList} from '../../../navigators/MatchNavigator';

type TCreateTeamProfileScreenProps = NativeStackScreenProps<
  MatchStackParamList,
  'TeamProfile'
>;

export const CreateTeamProfileScreen = ({
  navigation,
}: TCreateTeamProfileScreenProps): React.JSX.Element => {
  return (
    <SafeAreaView style={{backgroundColor: '#ffffff'}}>
      <Text text="프로필 생성" />
    </SafeAreaView>
  );
};
