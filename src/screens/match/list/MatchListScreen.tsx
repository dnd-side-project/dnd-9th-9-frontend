import React, {useState} from 'react';

import styled from '@emotion/native';
import {type NativeStackScreenProps} from '@react-navigation/native-stack';
import {ScrollView} from 'react-native';

import {FilterButton} from '../../../components/Button/FilterButton';
import {Gap} from '../../../components/Gap';
import {type IMatchListItem} from '../../../components/List';
import {Searching} from '../../../components/Searching';
import {Text} from '../../../components/Text';
import {MatchingFloating} from '../../../features/match/components/MatchingFloating';
import {MatchingList} from '../../../features/match/components/MatchList/MatchingList';
import {MatchTypeRadio} from '../../../features/match/components/MatchRadio';
import {type MatchStackParamList} from '../../../navigators/MatchNavigator';

type TMatchListScreenProps = NativeStackScreenProps<
  MatchStackParamList,
  'MatchList'
>;

const DUMMY_DATA: IMatchListItem[] = [
  {
    image: '',
    title: '2주만 빡세게',
    level: '초보',
    matchingType: '1vs1',
    isFinish: false,
    currentMember: 1,
    maximumMember: 10,
    period: 2,
  },
  {
    image: '',
    title: '대결할 사람',
    level: '고수',
    matchingType: '1vs1',
    isFinish: false,
    currentMember: 1,
    maximumMember: 10,
    period: 1,
  },
  {
    image: '',
    title: '개발자 운동 모임',
    level: '전체',
    matchingType: '팀vs팀',
    isFinish: true,
    currentMember: 3,
    maximumMember: 10,
    period: 3,
  },
  {
    image: '',
    title: '여름에 수영복 입어야지?',
    level: '보통이상',
    matchingType: '팀vs팀',
    isFinish: false,
    currentMember: 1,
    maximumMember: 8,
    period: 1,
  },
  {
    image: '',
    title: 'DND만 컴온',
    level: '고수',
    matchingType: '팀모집',
    isFinish: false,
    currentMember: 3,
    maximumMember: 6,
    period: 3,
  },
];

export const MatchListScreen = ({
  navigation,
}: TMatchListScreenProps): React.JSX.Element => {
  const [matchingTypeFilter, setMatchingTypeFilter] = useState('1vs1');
  const [activeFloating, setActiveFloating] = useState(false);

  const handleTeamDetail = (teamId: string): void => {
    navigation.navigate('MatchDetail');
  };

  return (
    <StyledScreen>
      <ScrollView>
        <Gap size="20px" />
        <Searching
          placeholder="닉네임, 매칭 제목을 검색해주세요."
          handleSearch={() => {}}
        />

        <MatchTypeRadio
          pick={matchingTypeFilter}
          handlePick={setMatchingTypeFilter}
        />

        <StyledFlexView>
          <Text
            type="body3"
            text={`총 ${DUMMY_DATA.length}개의 매칭`}
            color="gray-700"
          />
          <FilterButton
            isActive={false}
            onPress={() => {
              navigation.navigate('MatchFilter');
            }}
          />
        </StyledFlexView>

        {/* TODO: 매칭 리스트 없는 경우 화면 추가 */}
        <MatchingList
          data={DUMMY_DATA}
          onPress={(value: string) => {
            handleTeamDetail(value);
          }}
        />
      </ScrollView>

      <MatchingFloating
        isActive={activeFloating}
        openMenu={() => {
          setActiveFloating(true);
        }}
        closeMenu={() => {
          setActiveFloating(false);
        }}
        createMatch={() => {
          navigation.navigate('TeamInformation');
        }}
        autoMatch={() => {
          navigation.navigate('AutoMatch');
        }}
      />
    </StyledScreen>
  );
};

const StyledScreen = styled.SafeAreaView`
  background-color: ${props => props.theme.palette['gray-0']};
`;

const StyledFlexView = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 14px 16px;
`;
