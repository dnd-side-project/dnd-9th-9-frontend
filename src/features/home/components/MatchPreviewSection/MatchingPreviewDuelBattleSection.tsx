import React, {useMemo} from 'react';

import styled from '@emotion/native';
import {View} from 'react-native';

import {
  MatchingPreviewSectionCard,
  MatchingPreviewSectionCardListItem,
} from './MatchingPreviewSectionCard';
import {NoMatching} from './NoMatching';
import {Text} from '../../../../components/Text';
import {useGetUserFieldHomeBattle} from '../../hooks/userField';
import {type IUserFieldHomeBattle} from '../../types';

type THomeBattleField = Exclude<keyof IUserFieldHomeBattle, 'name'>;

type THomeBattleFieldInfos = Record<
  THomeBattleField,
  {
    gap: number;
    winningUserName: string;
  }
>;

export const MatchingPreviewDuelBattleSection = (): React.JSX.Element => {
  const {data: userFieldBattle} = useGetUserFieldHomeBattle({
    battleType: 'DUEL',
  });

  const duelBattleInfos: THomeBattleFieldInfos | null = useMemo(() => {
    if (userFieldBattle == null) {
      return null;
    }

    const result: THomeBattleFieldInfos = {
      goalAchievedCount: {
        gap: 0,
        winningUserName: '',
      },
      totalBurnedCalorie: {
        gap: 0,
        winningUserName: '',
      },
      totalExerciseTimeMinute: {
        gap: 0,
        winningUserName: '',
      },
      totalRecordCount: {
        gap: 0,
        winningUserName: '',
      },
    };

    const fields = Object.keys(userFieldBattle.home).filter(
      key => key !== 'name',
    ) as THomeBattleField[];

    fields.forEach(field => {
      const gap = Math.abs(
        userFieldBattle.home[field] - userFieldBattle.away[field],
      );

      const winningUserName =
        // TODO(@minimalKim): 값 동일한 경우 UI 명세 요청
        userFieldBattle.home[field] >= userFieldBattle.away[field]
          ? userFieldBattle.home.name
          : userFieldBattle.away.name;

      result[field] = {
        ...result[field],
        gap,
        winningUserName,
      };
    });

    return result;
  }, [userFieldBattle]);

  return (
    <View>
      {userFieldBattle != null && duelBattleInfos != null ? (
        <MatchingPreviewSectionCard
          title={() => (
            <StyledTitleContainer>
              <Text text={`${userFieldBattle?.away?.name}`} fontWeight="600" />
              <Text text="님과 대결 중" />
            </StyledTitleContainer>
          )}
          onPress={() => {}}>
          <View>
            <Text
              type="caption"
              color="gray-600"
              text={`완료까지${userFieldBattle.daysLeft}일`}
            />
            <StyledBattleListContainer>
              <MatchingPreviewSectionCardListItem label="기록횟수">
                <Text
                  text={`${duelBattleInfos.totalRecordCount.winningUserName}님이 ${duelBattleInfos?.totalRecordCount.gap}회 더 앞서있어요!`}
                  type="body3"
                  color="gray-600"
                />
              </MatchingPreviewSectionCardListItem>
              <MatchingPreviewSectionCardListItem label="활동링 달성">
                <Text
                  text={`${duelBattleInfos.totalRecordCount.winningUserName}님이 ${duelBattleInfos?.totalRecordCount.gap}회 더 앞서있어요!`}
                  type="body3"
                  color="gray-600"
                />
              </MatchingPreviewSectionCardListItem>
              <MatchingPreviewSectionCardListItem label="운동시간">
                <Text
                  text={`${duelBattleInfos.totalRecordCount.winningUserName}님이 ${duelBattleInfos?.totalRecordCount.gap}회 더 앞서있어요!`}
                  type="body3"
                  color="gray-600"
                />
              </MatchingPreviewSectionCardListItem>
              <MatchingPreviewSectionCardListItem label="소모칼로리">
                <Text
                  text={`${duelBattleInfos.totalRecordCount.winningUserName}님이 ${duelBattleInfos?.totalRecordCount.gap}회 더 앞서있어요!`}
                  type="body3"
                  color="gray-600"
                />
              </MatchingPreviewSectionCardListItem>
            </StyledBattleListContainer>
          </View>
        </MatchingPreviewSectionCard>
      ) : (
        <NoMatching />
      )}
    </View>
  );
};

const StyledTitleContainer = styled.View`
  display: flex;
  flex-direction: row;
`;

const StyledBattleListContainer = styled.View`
  display: flex;
  gap: 20px;
  margin-top: 16px;
  padding-right: 16px;
`;
