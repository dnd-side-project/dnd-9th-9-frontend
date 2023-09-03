import React, {useMemo, useState} from 'react';

import styled from '@emotion/native';

import {BottomSheet} from '../../../../../components/BottomSheet';
import {Text} from '../../../../../components/Text';
import useStore from '../../../../../store/client/useStore';
import {ExpectedBurnedCaloriesSection} from '../ExpectedBurnedCaloriesSection';

interface IWorkoutActivityTimeModalProps {
  isOpened: boolean;
  onClose?: () => void;
  onFinish?: () => void;
}

export const WorkoutActivityTimeModal = ({
  isOpened,
  onClose,
  onFinish,
}: IWorkoutActivityTimeModalProps): React.JSX.Element => {
  const {workoutForm, setWorkoutForm} = useStore();

  // TODO: form validate 추가
  const [hour, setHour] = useState<number | null>(workoutForm.hour);
  const [minute, setMinute] = useState<number | null>(workoutForm.minute);

  const durationMinute = useMemo(() => {
    if (hour !== null && minute !== null) return hour * 60 + minute;
    return null;
  }, [hour, minute]);

  const resetTime = (): void => {
    setHour(null);
    setMinute(null);
  };

  const handlePressClose = (): void => {
    setHour(workoutForm.hour);
    setMinute(workoutForm.minute);
    onClose?.();
  };

  const canFinish = hour !== null && minute !== null;
  const handlePressFinish = (): void => {
    if (!canFinish) return;

    setWorkoutForm('hour', hour);
    setWorkoutForm('minute', minute);
    onClose?.();
    onFinish?.();
  };

  return (
    <BottomSheet
      isOpened={isOpened}
      defaultSelectedTabId="time"
      onClose={onClose}>
      <BottomSheet.TabList>
        <BottomSheet.Tab id="time" title="운동시간" />
        <StyledTouchable
          onPress={() => {
            resetTime();
          }}>
          <Text text="초기화" color="gray-600" type="body2" fontWeight="700" />
        </StyledTouchable>
      </BottomSheet.TabList>

      <BottomSheet.Content id="time">
        <StyledModalContent>
          <StyledInputGroup>
            <StyledInputContainer>
              <StyledTimeInput
                keyboardType="numeric"
                value={hour?.toString() ?? ''}
                onChangeText={value => {
                  setHour(+value);
                }}
                labelLength={2}
              />
              <StyledTextWrapper>
                <Text text="시간" type="body1" fontWeight="700" />
              </StyledTextWrapper>
            </StyledInputContainer>

            <StyledColonWrapper>
              <Text text=":" type="body1" fontWeight="700" color="gray-500" />
            </StyledColonWrapper>

            <StyledInputContainer>
              <StyledTimeInput
                keyboardType="numeric"
                value={minute?.toString() ?? ''}
                onChangeText={value => {
                  setMinute(+value);
                }}
              />
              <StyledTextWrapper>
                <Text text="분" type="body1" fontWeight="700" />
              </StyledTextWrapper>
            </StyledInputContainer>
          </StyledInputGroup>

          {durationMinute != null && workoutForm.type != null && (
            <ExpectedBurnedCaloriesSection
              durationMinute={durationMinute}
              workoutType={workoutForm.type}
            />
          )}
        </StyledModalContent>

        <StyledBottomButtonContainer>
          <StyledCustomButton onPress={handlePressClose}>
            <Text text="닫기" color="gray-700" type="body2" fontWeight="600" />
          </StyledCustomButton>

          <StyledCustomButton
            disabled={!canFinish}
            variant={canFinish ? 'dark' : 'light'}
            onPress={handlePressFinish}>
            <Text
              text="완료"
              color={canFinish ? 'gray-0' : 'gray-700'}
              type="body2"
              fontWeight="600"
            />
          </StyledCustomButton>
        </StyledBottomButtonContainer>
      </BottomSheet.Content>
    </BottomSheet>
  );
};

const StyledTouchable = styled.TouchableOpacity`
  position: absolute;
  right: 0;
  margin-top: 8px;
`;

const StyledModalContent = styled.View`
  height: 350px;
`;

const StyledInputGroup = styled.View`
  flex-direction: row;
  margin-top: 46px;
`;

const StyledInputContainer = styled.View`
  position: relative;
  width: 114px;
`;

const StyledTextWrapper = styled.View`
  position: absolute;
  height: 50px;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  right: 0;
  padding-right: 16px;
`;

const StyledTimeInput = styled.TextInput<{labelLength?: number}>`
  border-radius: ${({theme}) => theme.borderRadius.sm};
  width: 114px;
  height: 50px;
  border-color: ${({theme}) => theme.palette['gray-300']};
  border-width: 2px;
  text-align: right;
  padding-right: ${({labelLength = 1}) => `${15 * labelLength + 20}px`};
  font-size: 18px;
  font-weight: 700;
`;

const StyledColonWrapper = styled.View`
  height: 50px;
  display: flex;
  justify-content: center;
  padding: 0 16px;
`;

export const StyledBottomButtonContainer = styled.View`
  display: flex;
  flex-direction: row;
  gap: 10px;
  padding-top: 10px;
`;

export const StyledCustomButton = styled.TouchableOpacity<{
  variant?: 'dark' | 'light';
}>`
  background-color: ${({variant = 'light', theme}) =>
    variant === 'dark' ? theme.palette['gray-950'] : theme.palette['gray-200']};
  border-radius: ${({theme}) => theme.borderRadius.md};
  padding: 16px 0;
  flex: 1;
  display: flex;
  align-items: center;
`;
