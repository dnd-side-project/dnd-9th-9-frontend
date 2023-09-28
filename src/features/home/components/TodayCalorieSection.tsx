import React from 'react';

import styled from '@emotion/native';

import {Gap} from '../../../components/Gap';
import {Text} from '../../../components/Text';
import {dayjs} from '../../../lib/dayjs';
import {useGetBurnedCalorieGoal} from '../../record/hooks/exercise';

export const TodayCalorieSection = (): React.JSX.Element => {
  const today = dayjs().format('YYYY-MM-DD');

  const {data: burnedCalorieGoal, refetch: refetchBurnedCalorieGoal} =
    useGetBurnedCalorieGoal({
      date: today,
    });

  const achievementPercent = (
    ((burnedCalorieGoal?.burnedCalorie ?? 0) /
      Math.max(burnedCalorieGoal?.goalCalorie ?? 0, 1)) *
    100
  ).toFixed(1);

  return (
    <StyledTodayCalorieSection>
      <Text text="오늘 소모 칼로리" type="head4" fontWeight="600" />
      <Gap size="10px" />

      <Text
        text={
          burnedCalorieGoal != null
            ? `${burnedCalorieGoal.goalCalorie} kcal 중`
            : '목표 칼로리가 없습니다'
        }
        type="body2"
        fontWeight="600"
        color="gray-600"
      />

      <StyledCalorieContainer>
        <Text
          text={`${burnedCalorieGoal?.burnedCalorie ?? 0} kcal`}
          type="head2"
          fontWeight="700"
          color="gray-700"
        />
        <StyledResetButton
          onPress={() => {
            void refetchBurnedCalorieGoal();
          }}>
          <Text
            text="새로고침"
            type="caption"
            fontWeight="600"
            color="gray-600"
          />
        </StyledResetButton>
      </StyledCalorieContainer>

      <StyledGraphWrapper>
        <StyledGraph percent={achievementPercent} />
      </StyledGraphWrapper>

      <StyledTextWrapper>
        <Text
          text={`달성률 ${achievementPercent}%`}
          type="body3"
          color="gray-400"
        />
      </StyledTextWrapper>
    </StyledTodayCalorieSection>
  );
};

const StyledTodayCalorieSection = styled.View`
  padding: 28px 16px 14px;
`;

const StyledCalorieContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-between;
  margin-top: 2px;
`;

const StyledResetButton = styled.TouchableOpacity`
  border-radius: 12.449px;
  background: #f0f0f5;
  padding: 8px 11px;
`;

const StyledGraphWrapper = styled.View`
  position: relative;
  height: 16px;
  background-color: ${({theme}) => theme.palette['gray-50']};
  border-radius: ${({theme}) => theme.borderRadius.lg};
  margin-top: 12px;
`;

const StyledGraph = styled.View<{percent: string}>`
  position: absolute;
  left: 0;
  background-color: ${({theme}) => theme.palette['main-400']};
  border-radius: ${({theme}) => theme.borderRadius.lg};
  width: ${({percent}) => `${percent}%`};
  height: 100%;
`;

const StyledTextWrapper = styled.View`
  display: flex;
  align-items: center;
  margin-top: 8px;
`;
