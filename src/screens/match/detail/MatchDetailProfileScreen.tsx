import styled from '@emotion/native';
import {SafeAreaView, ScrollView} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {MatchStackParamList} from '../../../navigators/MatchNavigator';

import {Line} from '../../../components/Line';
import {theme} from '../../../assets/styles/theme';
import {IMatchDetail, IMatchMember} from '../../../features/match/types';
import {
  MatchDetailProfileSection,
  MatchDetailMembers,
} from '../../../features/match/components/MatchDetailProfile';

type TMatchDetailProfileScreenProps = NativeStackScreenProps<
  MatchStackParamList,
  'MatchDetailProfile'
>;

const DUMMY_DATA: IMatchDetail = {
  id: 0,
  profileImg: '',
  name: '치치와 함께 운동 대결 해봐요',
  description: '열심히 하자',
  rule: '이틀에 한 번은 운동하기',
  fieldType: 'TEAM_BATTLE',
  goal: 'LOSS',
  period: 'ONE_WEEK',
  skillLevel: 'BEGINNER',
  strength: 'LOW',
  currentSize: 0,
  maxSize: 10,
  endDate: '2023-09-01 23:59:59',
};

const MEMBER_DUMMY_DATA: IMatchMember[] = [
  {
    id: 0,
    name: 'test1',
    profileImg: '',
    skillLevel: 'BEGINNER',
  },
  {
    id: 1,
    name: 'test2',
    profileImg: '',
    skillLevel: 'EXPERT',
  },
];

export const MatchDetailProfileScreen = ({
  navigation,
}: TMatchDetailProfileScreenProps) => {
  const {currentSize, maxSize} = DUMMY_DATA;
  return (
    <SafeAreaView
      style={{backgroundColor: theme.palette['gray-0'], height: '100%'}}>
      <ScrollView>
        <MatchDetailProfileSection detailInfo={DUMMY_DATA} isMember={true} />
        <Line size="lg" />
        <MatchDetailMembers
          currentSize={currentSize}
          maxSize={maxSize}
          members={MEMBER_DUMMY_DATA}
        />
      </ScrollView>
    </SafeAreaView>
  );
};
