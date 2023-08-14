import React from 'react';
import {SafeAreaView} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Text} from '../../../components/Text';
import {MatchStackParamList} from '../../../navigators/MatchNavigator';

type TCreateTeamProfileScreenProps = NativeStackScreenProps<
  MatchStackParamList,
  'TeamProfile'
>;

export const CreateTeamProfileScreen = ({
  navigation,
}: TCreateTeamProfileScreenProps) => {
  return (
    <SafeAreaView style={{backgroundColor: '#ffffff'}}>
      <Text text="프로필 생성" />
    </SafeAreaView>
  );
};
