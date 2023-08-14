import React, {useEffect, useState} from 'react';

import styled from '@emotion/native';
import {
  type HKWorkoutQueriedSampleType,
  type HealthInputOptions,
} from 'react-native-health';

import {WorkoutCardItem} from './WorkoutCardItem';
import {Text} from '../../../../components/Text';
import {
  AppleHealthKit,
  observeNewWorkout,
} from '../../../../lib/AppleHealthKit/AppleHealthKit';
import {type dayjs} from '../../../../lib/dayjs';

interface WorkoutCardGroupProps {
  selectedDate: dayjs.Dayjs;
}

export const WorkoutCardGroup = ({
  selectedDate,
}: WorkoutCardGroupProps): React.JSX.Element => {
  const [selectedDateWorkouts, setSelectedDateWorkouts] = useState<
    HKWorkoutQueriedSampleType[]
  >([]);

  const loadAnchoredWorkouts = (selectedDate: dayjs.Dayjs): void => {
    const options: HealthInputOptions = {
      startDate: selectedDate.startOf('hour').toISOString(),
      endDate: selectedDate.startOf('hour').add(1, 'day').toISOString(),
      anchor: 'base64encodedstring',
    };

    AppleHealthKit.getAnchoredWorkouts(options, (_err, results) => {
      setSelectedDateWorkouts(results.data);
      console.log(results.data);
    });
  };

  useEffect(() => {
    loadAnchoredWorkouts(selectedDate);

    observeNewWorkout(() => {
      loadAnchoredWorkouts(selectedDate);
    });
  }, [selectedDate]);

  return (
    <StyledWorkoutCardGroup
      contentContainerStyle={{
        rowGap: 10,
      }}>
      {selectedDateWorkouts.length > 0 ? (
        selectedDateWorkouts.map(workout => (
          <WorkoutCardItem {...workout} key={workout.id} />
        ))
      ) : (
        <StyledNoWorkout>
          <Text text="운동기록이 없어요" color="gray-200" type="body1" />
        </StyledNoWorkout>
      )}
    </StyledWorkoutCardGroup>
  );
};

const StyledWorkoutCardGroup = styled.ScrollView`
  border-top-width: 1px;
  border-top-color: ${props => props.theme.palette['gray-50']};
  padding: 10px 18px;
  height: 100%;
`;

const StyledNoWorkout = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;

  height: 100%;
`;
