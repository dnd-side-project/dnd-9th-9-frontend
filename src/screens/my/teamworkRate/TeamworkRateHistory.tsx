import React from 'react';

import styled from '@emotion/native';
import {FlatList, SafeAreaView, TouchableOpacity} from 'react-native';

import {theme} from '../../../assets/styles/theme';
import {Gap} from '../../../components/Gap';
import {Text} from '../../../components/Text';
import {TopBar} from '../../../components/TopBar';
import {TeamworkRateHistoryCard} from '../../../features/my/components/teamworkRate';
import {type ITeamworkRateHistory} from '../../../features/my/types';
import {dayjs} from '../../../lib/dayjs';

export const TeamworkRateHistory = (): React.JSX.Element => {
  const dummy: ITeamworkRateHistory[] = [
    {
      endDate: '2023-12-15',
      fieldType: 'DUEL',
      myFieldName: 'string',
      opponentName: '김마르',
      period: 'ONE_WEEK',
      teamworkRate: 4,
      winStatus: 'WIN',
    },
    {
      endDate: '2023-12-15',
      fieldType: 'TEAM_BATTLE',
      myFieldName: '작심삼년',
      opponentName: '가보자고',
      period: 'ONE_WEEK',
      teamworkRate: 3,
      winStatus: 'DRAW',
    },
    {
      endDate: '2023-12-14',
      fieldType: 'TEAM_BATTLE',
      myFieldName: '작심삼년',
      opponentName: '가보자고',
      period: 'ONE_WEEK',
      teamworkRate: 2,
      winStatus: 'LOSE',
    },
    {
      endDate: '2023-12-13',
      fieldType: 'TEAM',
      myFieldName: '작심삼년',
      opponentName: '가보자고',
      period: 'ONE_WEEK',
      teamworkRate: 1,
      winStatus: 'DRAW',
    },
  ];

  const renderItem = ({
    item,
    index,
  }: {
    item: ITeamworkRateHistory;
    index: number;
  }): React.JSX.Element => {
    const isDateLabelVisible =
      index === 0 || item.endDate !== dummy[index - 1].endDate;
    return (
      <>
        {isDateLabelVisible && (
          <>
            <Gap size="16px" />
            <Text
              text={dayjs(item.endDate).format('MM월 DD일')}
              color="gray-400"
            />
            <Gap size="8px" />
          </>
        )}
        <TeamworkRateHistoryCard teamworkRateHistory={item} />
        <Gap size="12px" />
      </>
    );
  };

  return (
    <>
      <>
        <SafeAreaView style={{backgroundColor: theme.palette['gray-0']}} />
        <TopBar showBackButton headerText="불꽃 히스토리" />
        <StyledTabContainer>
          <TouchableOpacity>
            <Text text="전쳬보기" type="body3" color="gray-400" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Text text="1:1 매칭" type="body3" color="gray-400" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Text text="팀 매칭" type="body3" color="gray-400" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Text text="매칭 없는 팀" type="body3" color="gray-400" />
          </TouchableOpacity>
        </StyledTabContainer>

        <StyledScrollView>
          <StyledCardContainer>
            <FlatList
              data={dummy}
              renderItem={renderItem}
              // TODO(@minimalKim): history item id 프로퍼티 백엔드에 추가 요청
              keyExtractor={(_, index) => index.toString()}
              contentContainerStyle={{padding: 20}}
            />
          </StyledCardContainer>
        </StyledScrollView>
      </>
    </>
  );
};

const StyledTabContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 30px;
  padding: 16px;
  background-color: ${({theme}) => theme.palette['gray-0']};
`;

const StyledScrollView = styled.ScrollView`
  background-color: ${({theme}) => theme.palette['gray-0']};
`;

const StyledCardContainer = styled.View`
  display: flex;
`;
