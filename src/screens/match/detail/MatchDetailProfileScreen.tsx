import React from 'react';

import {type RouteProp, useRoute} from '@react-navigation/native';
import {SafeAreaView, ScrollView, View} from 'react-native';

import {theme} from '../../../assets/styles/theme';
import {Line} from '../../../components/Line';
import {
  MatchDetailProfileSection,
  MatchDetailMembers,
} from '../../../features/match/components/MatchDetailProfile';
import {useGetFieldDetail} from '../../../features/match/hooks/field';
import {type IMatchMember} from '../../../features/match/types';
import {type MatchStackParamList} from '../../../navigators';

interface IMatchDetailProfileScreenProps {
  id?: number;
}

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

type TMatchDetailProfileScreenRouteProps = RouteProp<
  MatchStackParamList,
  'MatchDetailProfile'
>;

export const MatchDetailProfileScreen = ({
  id,
}: IMatchDetailProfileScreenProps): React.JSX.Element => {
  const route = useRoute<TMatchDetailProfileScreenRouteProps>();
  const paramId = route?.params?.id ?? undefined;

  const {data: fieldDetailData, isError} = useGetFieldDetail({
    id: id ?? paramId,
  });

  // TODO: 오류 화면 (서버, 404 등... 앱에서도 필요한가?) 디자인 시스템 요청드리기
  if (
    (id === undefined && paramId === undefined) ||
    fieldDetailData === undefined ||
    isError
  )
    return <View></View>;

  return (
    <SafeAreaView
      style={{backgroundColor: theme.palette['gray-0'], height: '100%'}}>
      <ScrollView>
        <MatchDetailProfileSection
          detailInfo={fieldDetailData.fieldDto}
          isMember={true}
        />
        <Line size="lg" />
        <MatchDetailMembers
          currentSize={fieldDetailData?.fieldDto?.currentSize ?? 0}
          maxSize={fieldDetailData?.fieldDto?.maxSize ?? 0}
          members={MEMBER_DUMMY_DATA}
        />
      </ScrollView>
    </SafeAreaView>
  );
};
