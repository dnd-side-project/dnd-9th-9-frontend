import React from 'react';

import styled from '@emotion/native';
import {View} from 'react-native';

import {
  MatchingPreviewSectionCard,
  MatchingPreviewSectionCardListItem,
} from './MatchingPreviewSectionCard';
import {NoMatching} from './NoMatching';
import {ProfileName} from './ProfileName';
import {Text} from '../../../../components/Text';
import {useGetMyProfileDetail} from '../../../my/hooks/profile';
import {useGetUserFieldHomeTeam} from '../../hooks/userField';

export const MatchingPreviewTeamSection = (): React.JSX.Element => {
  const {data: userFieldHomeTeam} = useGetUserFieldHomeTeam();
  const {data: myProfileDetail} = useGetMyProfileDetail();
  console.log('userFieldHomeTeam', userFieldHomeTeam);

  return (
    <>
      {userFieldHomeTeam != null ? (
        <MatchingPreviewSectionCard
          title={() => (
            <StyledTitleContainer>
              <Text text={`${userFieldHomeTeam.teamName}팀`} fontWeight="600" />
              <Text text="에서 달리는 중" />
            </StyledTitleContainer>
          )}
          onPress={() => {}}>
          <View>
            <Text
              type="caption"
              color="gray-600"
              text={`완료까지${userFieldHomeTeam.daysLeft}일`}
            />
            <StyledBattleListContainer>
              <MatchingPreviewSectionCardListItem label="기록횟수">
                <DescriptionContainer>
                  <ProfileName
                    isHome={
                      myProfileDetail?.name ===
                      userFieldHomeTeam.recordCount.name
                    }
                    name={userFieldHomeTeam.recordCount.name[0]}
                  />
                  <Text
                    text={`님이 ${userFieldHomeTeam.recordCount.value}회로 1등!`}
                    type="body3"
                    color="gray-600"
                  />
                </DescriptionContainer>
              </MatchingPreviewSectionCardListItem>

              <MatchingPreviewSectionCardListItem label="활동링 달성">
                <DescriptionContainer>
                  <ProfileName
                    isHome={
                      myProfileDetail?.name ===
                      userFieldHomeTeam.goalAchievedCount.name
                    }
                    name={userFieldHomeTeam.goalAchievedCount.name[0]}
                  />
                  <Text
                    // TODO(@minimalKim): 수치 %인지 확인
                    text={`님이 ${userFieldHomeTeam.goalAchievedCount.value}%로 1등!`}
                    type="body3"
                    color="gray-600"
                  />
                </DescriptionContainer>
              </MatchingPreviewSectionCardListItem>

              <MatchingPreviewSectionCardListItem label="운동시간">
                <DescriptionContainer>
                  <ProfileName
                    isHome={
                      myProfileDetail?.name ===
                      userFieldHomeTeam.exerciseTimeMinute.name
                    }
                    name={userFieldHomeTeam.goalAchievedCount.name[0]}
                  />
                  <Text
                    text={`님이 ${userFieldHomeTeam.exerciseTimeMinute.value}분으로 1등!`}
                    type="body3"
                    color="gray-600"
                  />
                </DescriptionContainer>
              </MatchingPreviewSectionCardListItem>

              <MatchingPreviewSectionCardListItem label="소모칼로리">
                <DescriptionContainer>
                  <ProfileName
                    isHome={
                      myProfileDetail?.name ===
                      userFieldHomeTeam.burnedCalorie.name
                    }
                    name={userFieldHomeTeam.burnedCalorie.name[0]}
                  />
                  <Text
                    text={`님이 ${userFieldHomeTeam.burnedCalorie.value}kcal로 1등!`}
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
  gap: 4px;
  width: 100%;
  min-width: 180px;
  max-width: 65%;
`;
