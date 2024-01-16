import React, {useEffect} from 'react';

import styled from '@emotion/native';

import {Text} from '../../../../components/Text';
import {type HealthActivity} from '../../../../lib/AppleHealthKit';
import useStore from '../../../../store/client/useStore';
import {useGetExpectedBurnedCalorie} from '../../hooks/exercise';

interface IExpectedBurnedCaloriesSectionProps {
  workoutType: HealthActivity;
  durationMinute: number;
}

export const ExpectedBurnedCaloriesSection = ({
  workoutType,
  durationMinute,
}: IExpectedBurnedCaloriesSectionProps): React.JSX.Element => {
  const {data: burnedCalorie} = useGetExpectedBurnedCalorie({
    sports: workoutType,
    durationMinute,
  });

  const {setWorkoutForm} = useStore();

  useEffect(() => {
    if (burnedCalorie === undefined) return;
    setWorkoutForm('energyBurned', burnedCalorie);
  }, [burnedCalorie]);

  return (
    <StyledExpectedBurnedCaloriesSection>
      {burnedCalorie != null && (
        <>
          <Text text="예상 소비 칼로리는" />
          <Text
            color="main-300"
            text={` ${burnedCalorie}kcal`}
            fontWeight="700"
          />
          <Text text="예요." />
        </>
      )}
    </StyledExpectedBurnedCaloriesSection>
  );
};

const StyledExpectedBurnedCaloriesSection = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 90px;
`;
