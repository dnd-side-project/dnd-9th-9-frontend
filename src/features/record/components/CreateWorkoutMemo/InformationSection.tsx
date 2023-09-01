import React from 'react';

import styled from '@emotion/native';

import {ReadOnlyTextfield} from './ReadOnlyTextfield';
import {WORKOUT_ACTIVITY} from '../../../../lib/AppleHealthKit';
import useStore from '../../../../store/client/useStore';

export const InformationSection = (): React.JSX.Element => {
  const {workoutForm} = useStore();
  const workoutTimeLabel =
    workoutForm.hour !== null && workoutForm.minute !== null
      ? `${workoutForm.hour}시 ${workoutForm.minute}분`
      : '';

  return (
    <StyledInformationSection>
      <ReadOnlyTextfield
        label="운동종류"
        value={workoutForm.type ? WORKOUT_ACTIVITY[workoutForm.type].label : ''}
      />
      <ReadOnlyTextfield label="운동시간" value={workoutTimeLabel} />
      <ReadOnlyTextfield
        label="예상 소비칼로리"
        value={`${workoutForm.energyBurned.toString()}kcal`}
      />
    </StyledInformationSection>
  );
};

const StyledInformationSection = styled.View`
  background-color: ${({theme}) => theme.palette['gray-0']};
  margin-top: 14px;
  padding: 24px 16px;
  gap: 24px;
`;
