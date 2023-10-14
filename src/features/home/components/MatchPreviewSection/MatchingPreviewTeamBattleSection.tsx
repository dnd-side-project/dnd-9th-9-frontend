import React from 'react';

import styled from '@emotion/native';
import {View} from 'react-native';

import {MatchingBar} from './MatchingBar';
import {
  MatchingPreviewSectionCard,
  MatchingPreviewSectionCardListItem,
} from './MatchingPreviewSectionCard';
import {NoMatching} from './NoMatching';
import {Text} from '../../../../components/Text';
import {useGetUserFieldHomeBattle} from '../../hooks/userField';

export const MatchingPreviewTeamBattleSection = (): React.JSX.Element => {
  const {data: userFieldBattle} = useGetUserFieldHomeBattle({
    battleType: 'TEAM_BATTLE',
  });

  return (
    <>
      {userFieldBattle != null ? (
        <MatchingPreviewSectionCard
          title={() => (
            <StyledTitleContainer>
              <Text
                text={`${userFieldBattle.home.name} VS ${userFieldBattle.away.name}`}
                fontWeight="600"
              />
            </StyledTitleContainer>
          )}
          onPress={() => {}}>
          <View>
            <Text
              type="caption"
              color="gray-600"
              text={`완료까지${userFieldBattle.daysLeft}일`}
            />
            <StyledMatchingBarContainer>
              <MatchingPreviewSectionCardListItem label="기록횟수">
                <MatchingBar
                  leftValue={userFieldBattle.home.totalRecordCount}
                  rightValue={userFieldBattle.away.totalRecordCount}
                  leftName={userFieldBattle.home.name}
                  rightName={userFieldBattle.away.name}
                  style={{width: '70%'}}
                />
              </MatchingPreviewSectionCardListItem>
              <MatchingPreviewSectionCardListItem label="활동링 달성">
                <MatchingBar
                  leftValue={userFieldBattle.home.goalAchievedCount}
                  rightValue={userFieldBattle.away.goalAchievedCount}
                  leftName={userFieldBattle.home.name}
                  rightName={userFieldBattle.away.name}
                  style={{width: '70%'}}
                />
              </MatchingPreviewSectionCardListItem>
              <MatchingPreviewSectionCardListItem label="운동시간">
                <MatchingBar
                  leftValue={userFieldBattle.home.totalExerciseTimeMinute}
                  rightValue={userFieldBattle.away.totalExerciseTimeMinute}
                  leftName={userFieldBattle.home.name}
                  rightName={userFieldBattle.away.name}
                  style={{width: '70%'}}
                />
              </MatchingPreviewSectionCardListItem>
              <MatchingPreviewSectionCardListItem label="소모칼로리">
                <MatchingBar
                  leftValue={userFieldBattle.home.totalBurnedCalorie}
                  rightValue={userFieldBattle.away.totalBurnedCalorie}
                  leftName={userFieldBattle.home.name}
                  rightName={userFieldBattle.away.name}
                  style={{width: '70%'}}
                />
              </MatchingPreviewSectionCardListItem>
            </StyledMatchingBarContainer>
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

const StyledMatchingBarContainer = styled.View`
  display: flex;
  display: flex;
  gap: 30px;
  margin-top: 26px;
  margin-bottom: 6px;
`;
