import React, {useMemo, useState} from 'react';

import styled from '@emotion/native';
import {TouchableOpacity} from 'react-native';

import {Gap} from '../../../components/Gap';
import {Tag} from '../../../components/Tag';
import {Text} from '../../../components/Text';
import {
  WORKOUT_ACTIVITY,
  type HealthActivity,
} from '../../../lib/AppleHealthKit';
import {dayjs} from '../../../lib/dayjs';
import {useGetRecentExercise} from '../../record/hooks/exercise';

export const CurrentWorkoutSection = (): React.JSX.Element => {
  const [selectedWorkout, setSelectedWorkout] = useState<HealthActivity | null>(
    null,
  );

  const {data: recentExercise} = useGetRecentExercise({
    date: dayjs().format('YYYY-MM-DD'),
  });

  const totalExerciseDurationLabel = useMemo(() => {
    if (recentExercise === undefined) {
      return '';
    }
    const hour = Math.floor(recentExercise.totalExerciseMinute / 60);
    const minute = recentExercise.totalExerciseMinute % 60;
    return `${hour}시간 ${minute}분`;
  }, [recentExercise?.totalExerciseMinute]);

  return (
    <>
      <StyledSectionLine />
      <StyledCurrentWorkoutSection>
        <StyledTitleContainer>
          <Text text="최근 많이 한 운동" type="head4" fontWeight="600" />
          <Text text="오늘" type="body2" color="gray-600" />
        </StyledTitleContainer>

        <StyledTagContainer>
          {recentExercise?.recentSports.map((workout, index) => (
            <TouchableOpacity
              key={`${workout.sports}-${index}`}
              onPress={() => {
                setSelectedWorkout(workout.sports);
              }}>
              <Tag
                hasBorder
                type="sm"
                fontWeight="500"
                text={WORKOUT_ACTIVITY[workout.sports].label}
                color={selectedWorkout === workout.sports ? 'gray-0' : 'black'}
                borderColor={
                  selectedWorkout === workout.sports ? 'sub-400' : 'gray-400'
                }
                backgroundColor={
                  selectedWorkout === workout.sports ? 'sub-400' : 'gray-0'
                }
              />
            </TouchableOpacity>
          ))}
        </StyledTagContainer>

        <Gap size="20px" />

        <StyledGraphTitle>
          <Text
            text="총 운동 시간"
            type="body2"
            color="gray-700"
            fontWeight="600"
          />
          <Text
            text={totalExerciseDurationLabel}
            type="body2"
            color="gray-400"
            fontWeight="500"
          />
        </StyledGraphTitle>
        <StyledGraphWrapper>
          {recentExercise?.recentSports.map((workout, index) => (
            <StyledGraph
              key={`${workout.sports}-${index}`}
              isSelected={selectedWorkout === workout.sports}
              index={index}
              percent={(
                ((workout.exerciseMinute ?? 0) /
                  (recentExercise?.totalExerciseMinute ?? 1)) *
                100
              ).toString()}
              onPress={() => {
                setSelectedWorkout(workout.sports);
              }}
            />
          ))}
        </StyledGraphWrapper>

        <StyledGraphTitle>
          <Text
            text="총 소모 칼로리"
            type="body2"
            color="gray-700"
            fontWeight="600"
          />
          <Text
            text={`${recentExercise?.totalBurnedCalorie ?? 0} kcal`}
            type="body2"
            color="gray-400"
            fontWeight="500"
          />
        </StyledGraphTitle>
        <StyledGraphWrapper>
          {recentExercise?.recentSports.map((workout, index) => (
            <StyledGraph
              key={`${workout.sports}-${index}`}
              isSelected={selectedWorkout === workout.sports}
              index={index}
              percent={(
                ((workout.burnedCalorie ?? 0) /
                  (recentExercise?.totalBurnedCalorie ?? 1)) *
                100
              ).toString()}
              onPress={() => {
                setSelectedWorkout(workout.sports);
              }}
            />
          ))}
        </StyledGraphWrapper>
      </StyledCurrentWorkoutSection>
    </>
  );
};

const StyledSectionLine = styled.View`
  height: 10px;
  background-color: ${({theme}) => theme.palette['gray-50']};
`;

const StyledCurrentWorkoutSection = styled.View`
  padding: 28px 16px 14px;
`;

const StyledTitleContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const StyledGraphTitle = styled.View`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-between;
  margin-top: 12px;
`;

const StyledTagContainer = styled.View`
  margin-top: 10px;
  display: flex;
  flex-direction: row;
  gap: 6px;
`;

const StyledGraphWrapper = styled.View`
  position: relative;
  height: 16px;
  background-color: ${({theme}) => theme.palette['gray-50']};
  border-radius: ${({theme}) => theme.borderRadius.lg};
  margin-top: 12px;
  overflow: hidden;
  display: flex;
  flex-direction: row;
`;

const StyledGraph = styled.TouchableOpacity<{
  isSelected: boolean;
  percent: string;
  index: number;
}>`
  background-color: ${({theme, index, isSelected}) => {
    if (isSelected) return theme.palette['sub-400'];
    switch (index) {
      case 0:
        return theme.palette['gray-700'];
      case 1:
        return theme.palette['gray-600'];
      case 2:
        return theme.palette['gray-400'];
      case 3:
        return theme.palette['gray-300'];
      default:
        return theme.palette['gray-200'];
      // TODO(@minimalKim): 최근 운동 리스트 length 최대 확인
    }
  }};
  width: ${({percent}) => `${percent}%`};
  height: 100%;
`;
