import React from 'react';

import {SafeAreaView, ScrollView, View} from 'react-native';

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

interface IMatchDetailProfileScreenProps {
  id?: number;
}

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
  id,
}: IMatchDetailProfileScreenProps): React.JSX.Element => {
  // TODO: 오류 화면 (서버, 404 등... 앱에서도 필요한가?) 디자인 시스템 요청드리기
  if (id === undefined) return <View></View>;

  const {data = {fieldDto: DUMMY_DATA}} = useGetFieldDetail({id});
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
