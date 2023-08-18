import React from 'react';

import {type NativeStackScreenProps} from '@react-navigation/native-stack';
import {SafeAreaView, ScrollView} from 'react-native';

import {theme} from '../../../assets/styles/theme';
import {Line} from '../../../components/Line';
import {
  MatchDetailProfileSection,
  MatchDetailMembers,
} from '../../../features/match/components/MatchDetailProfile';
import {useGetFieldDetail} from '../../../features/match/hooks/field';
import {
  type IMatchDetail,
  type IMatchMember,
} from '../../../features/match/types';
import {type MatchStackParamList} from '../../../navigators/MatchNavigator';

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
}: TMatchDetailProfileScreenProps): React.JSX.Element => {
  // TODO: 사용자가 선택한 매칭의 Id 가져오기
  const DUMMY_ID = 1;

  // TODO: placeholder data 사용법 검토
  const {data = {fieldDto: DUMMY_DATA}} = useGetFieldDetail({id: DUMMY_ID});
  const {fieldDto} = data;

  return (
    <SafeAreaView
      style={{backgroundColor: theme.palette['gray-0'], height: '100%'}}>
      <ScrollView>
        <MatchDetailProfileSection detailInfo={fieldDto} isMember={true} />
        <Line size="lg" />
        <MatchDetailMembers
          currentSize={fieldDto.currentSize}
          maxSize={fieldDto.maxSize}
          members={MEMBER_DUMMY_DATA}
        />
      </ScrollView>
    </SafeAreaView>
  );
};
