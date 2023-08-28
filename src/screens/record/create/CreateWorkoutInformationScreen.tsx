import React, {useState} from 'react';

import styled from '@emotion/native';

import {Text} from '../../../components/Text';
import {
  WorkoutActivityTimeModal,
  WorkoutActivityTypeModal,
} from '../../../features/record/components/CreateWorkoutInformation/Modal';
import {WORKOUT_ACTIVITY} from '../../../lib/AppleHealthKit';
import useStore from '../../../store/client/useStore';

const workoutInformationSteps = [
  {
    title: '운동 종류를 선택해 주세요.',
    label: '운동종류',
    placeholder: '운동종류 찾기',
  },
  {
    title: '운동 시간을 입력해 주세요.',
    label: '운동시간',
    placeholder: '운동시간 입력',
  },
] as const;

export const CreateWorkoutInformationScreen = (): React.JSX.Element => {
  const [stepIndex, setStepIndex] = useState(0);
  const currentStep = workoutInformationSteps[stepIndex];

  const [isTypeModalOpened, setIsTypeModalOpened] = useState(false);
  const [isTimeModalOpened, setIsTimeModalOpened] = useState(false);

  const {workoutForm} = useStore();

  const workoutTypeLabel =
    workoutForm.type === null ? '' : WORKOUT_ACTIVITY[workoutForm.type].label;

  const workoutTimeLabel =
    workoutForm.hour !== null && workoutForm.minute !== null
      ? `${workoutForm.hour}시 ${workoutForm.minute}분`
      : '';

  return (
    <StyledWorkoutInformationScreen>
      <StyledTitle>
        <Text text={currentStep.title} type="head3" />
      </StyledTitle>

      <StyledStackView>
        {stepIndex === 1 && (
          <StyledInputContainer>
            <Text
              text={workoutInformationSteps[1].label}
              type="caption"
              color="gray-0"
            />
            <StyledTouchable
              onPress={() => {
                setStepIndex(1);
                setIsTimeModalOpened(true);
              }}>
              <Text
                text={
                  workoutTimeLabel === ''
                    ? workoutInformationSteps[1].placeholder
                    : workoutTimeLabel
                }
                type="body2"
                color={workoutTimeLabel === '' ? 'gray-200' : 'black'}
                fontWeight={workoutTimeLabel === '' ? '400' : '700'}
              />
            </StyledTouchable>
          </StyledInputContainer>
        )}

        <StyledInputContainer>
          <Text
            text={workoutInformationSteps[0].label}
            type="caption"
            color="gray-600"
          />
          <StyledTouchable
            onPress={() => {
              setStepIndex(0);
              setIsTypeModalOpened(true);
            }}>
            <Text
              text={
                workoutTypeLabel === ''
                  ? workoutInformationSteps[0].placeholder
                  : workoutTypeLabel
              }
              type="body2"
              color={workoutTypeLabel === '' ? 'gray-200' : 'black'}
              fontWeight={workoutTypeLabel === '' ? '400' : '700'}
            />
          </StyledTouchable>
        </StyledInputContainer>
      </StyledStackView>

      <WorkoutActivityTypeModal
        isOpened={isTypeModalOpened}
        onClose={() => {
          setIsTypeModalOpened(false);
        }}
        onFinish={() => {
          setStepIndex(index => index + 1);
          setIsTypeModalOpened(false);
          setIsTimeModalOpened(true);
        }}
      />

      <WorkoutActivityTimeModal
        isOpened={isTimeModalOpened}
        onClose={() => {
          setIsTimeModalOpened(false);
        }}
      />
    </StyledWorkoutInformationScreen>
  );
};

const StyledWorkoutInformationScreen = styled.View`
  flex: 1;
  background-color: ${({theme}) => theme.palette['gray-0']};
  padding: 0 16px;
`;

const StyledTitle = styled.View`
  margin: 32px 0;
`;

const StyledTouchable = styled.TouchableOpacity`
  padding: 10px 0;
  border-bottom-width: 2px;
  border-bottom-color: ${({theme}) => theme.palette['gray-100']};
`;

const StyledInputContainer = styled.View`
  height: 78px;
`;

const StyledStackView = styled.View`
  gap: 26px;
`;