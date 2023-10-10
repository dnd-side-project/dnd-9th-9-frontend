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
import {type THomeBattleField} from '../../types';

type THomeDuelBattleFieldInfos = Record<
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

  const duelBattleInfos: THomeDuelBattleFieldInfos | null = useMemo(() => {
    if (userFieldBattle == null) {
      return null;
    }

    const result: THomeDuelBattleFieldInfos = {
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
    <>
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
                <DescriptionContainer>
                  <StyledBattleProfile
                    isHome={
                      duelBattleInfos.totalRecordCount.winningUserName ===
                      userFieldBattle.home.name
                    }>
                    <Text
                      text={duelBattleInfos.totalRecordCount.winningUserName[0]}
                      color="gray-0"
                      type="body2"
                      fontWeight="700"
                    />
                  </StyledBattleProfile>
                  <Text
                    text={`님이 ${duelBattleInfos.totalRecordCount.gap}회 더 앞서있어요!`}
                    type="body3"
                    color="gray-600"
                  />
                </DescriptionContainer>
              </MatchingPreviewSectionCardListItem>

              <MatchingPreviewSectionCardListItem label="활동링 달성">
                <DescriptionContainer>
                  <StyledBattleProfile
                    isHome={
                      duelBattleInfos.goalAchievedCount.winningUserName ===
                      userFieldBattle.home.name
                    }>
                    <Text
                      text={
                        duelBattleInfos.goalAchievedCount.winningUserName[0]
                      }
                      color="gray-0"
                      type="body2"
                      fontWeight="700"
                    />
                  </StyledBattleProfile>
                  <Text
                    // TODO(@minimalKim): 수치 %인지 확인
                    text={`님이 ${duelBattleInfos.goalAchievedCount.gap}% 더 앞서있어요!`}
                    type="body3"
                    color="gray-600"
                  />
                </DescriptionContainer>
              </MatchingPreviewSectionCardListItem>

              <MatchingPreviewSectionCardListItem label="운동시간">
                <DescriptionContainer>
                  <StyledBattleProfile
                    isHome={
                      duelBattleInfos.totalExerciseTimeMinute
                        .winningUserName === userFieldBattle.home.name
                    }>
                    <Text
                      text={
                        duelBattleInfos.totalExerciseTimeMinute
                          .winningUserName[0]
                      }
                      color="gray-0"
                      type="body2"
                      fontWeight="700"
                    />
                  </StyledBattleProfile>
                  <Text
                    text={`님이 ${duelBattleInfos.totalExerciseTimeMinute.gap}분 더 앞서있어요!`}
                    type="body3"
                    color="gray-600"
                  />
                </DescriptionContainer>
              </MatchingPreviewSectionCardListItem>

              <MatchingPreviewSectionCardListItem label="소모칼로리">
                <DescriptionContainer>
                  <StyledBattleProfile
                    isHome={
                      duelBattleInfos.totalBurnedCalorie.winningUserName ===
                      userFieldBattle.home.name
                    }>
                    <Text
                      text={
                        duelBattleInfos.totalBurnedCalorie.winningUserName[0]
                      }
                      color="gray-0"
                      type="body2"
                      fontWeight="700"
                    />
                  </StyledBattleProfile>
                  <Text
                    text={`님이 ${duelBattleInfos.totalBurnedCalorie.gap}회 더 앞서있어요!`}
                    type="body3"
                    color="gray-600"
                  />
                </DescriptionContainer>
              </MatchingPreviewSectionCardListItem>
            </StyledBattleListContainer>
          </View>
        </MatchingPreviewSectionCard>
      ) : (
        <NoMatching />
      )}
    </>
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

const DescriptionContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 4;
`;

const StyledBattleProfile = styled.View<{
  isHome: boolean;
}>`
  width: 30px;
  height: 30px;
  border-radius: 15px;
  background-color: ${({theme, isHome}) =>
    isHome ? theme.palette['main-400'] : theme.palette['sub-400']};
  display: flex;
  align-items: center;
  justify-content: center;
`;
