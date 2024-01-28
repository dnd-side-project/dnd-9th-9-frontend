import React, {useState} from 'react';

import styled from '@emotion/native';
import {View} from 'react-native';

import {
  StyledBottomButtonContainer,
  StyledCustomButton,
} from './WorkoutActivityTimeModal';
import {type theme} from '../../../../../assets/styles/theme';
import {BottomSheet} from '../../../../../components/BottomSheet';
import {CheckBox} from '../../../../../components/CheckBox';
import {Text} from '../../../../../components/Text';
import {
  type HealthActivity,
  WORKOUT_ACTIVITY,
} from '../../../../../lib/AppleHealthKit';
import useStore from '../../../../../store/client/useStore';
import {type Entries} from '../../../../../utils/types';

interface IWorkoutActivityTypeModalProps {
  isOpened: boolean;
  onClose?: () => void;
  onFinish?: () => void;
}

export const WorkoutActivityTypeModal = ({
  isOpened,
  onClose,
  onFinish,
}: IWorkoutActivityTypeModalProps): React.JSX.Element => {
  const {workoutForm, setWorkoutForm} = useStore();

  const [selectedWorkoutType, setSelectedWorkoutType] =
    useState<HealthActivity | null>(workoutForm.type);

  const handlePressClose = (): void => {
    setSelectedWorkoutType(workoutForm.type);
    onClose?.();
  };

  const canFinish = selectedWorkoutType !== null;
  const handlePressFinish = (): void => {
    if (!canFinish) return;
    setWorkoutForm('type', selectedWorkoutType);
    onClose?.();
    onFinish?.();
  };

  return (
    <BottomSheet
      isOpened={isOpened}
      onClose={onClose}
      defaultSelectedTabId="type">
      <BottomSheet.TabList>
        <BottomSheet.Tab id="type" title="운동종류" />
        <BottomSheet.Tab id="bookmark" title="즐겨찾기" />
      </BottomSheet.TabList>

      <BottomSheet.Content id="type">
        <StyledScrollView>
          {(
            Object.entries(WORKOUT_ACTIVITY) as Entries<typeof WORKOUT_ACTIVITY>
          ).map(([workoutType, {label}]) => {
            return (
              <View key={workoutType}>
                <StyledTouchableWorkoutListItem
                  isSelected={workoutType === selectedWorkoutType}
                  onPress={() => {
                    setSelectedWorkoutType(workoutType);
                  }}>
                  <CheckBox
                    isCheck={workoutType === selectedWorkoutType}
                    onPress={() => {
                      setSelectedWorkoutType(workoutType);
                    }}
                  />
                  <Text
                    text={label}
                    type="body2"
                    fontWeight="600"
                    style={{marginLeft: 4}}
                  />
                  {/* TODO: bookmark Icon 추가 */}
                </StyledTouchableWorkoutListItem>
                <VerticalLine height="2px" color="gray-200" />
              </View>
            );
          })}
        </StyledScrollView>

        <StyledBottomButtonContainer>
          <StyledCustomButton onPress={handlePressClose}>
            <Text text="닫기" color="gray-700" type="body2" fontWeight="600" />
          </StyledCustomButton>

          <StyledCustomButton
            disabled={!canFinish}
            variant={canFinish ? 'dark' : 'light'}
            onPress={handlePressFinish}>
            <Text
              text="선택 완료"
              color={canFinish ? 'gray-0' : 'gray-700'}
              type="body2"
              fontWeight="600"
            />
          </StyledCustomButton>
        </StyledBottomButtonContainer>
      </BottomSheet.Content>

      <BottomSheet.Content id="bookmark">
        {/* TODO: bookmark 추가 */}
        <Text text="time" />
      </BottomSheet.Content>
    </BottomSheet>
  );
};

const StyledScrollView = styled.ScrollView`
  max-height: 400px;
  border-top-width: 2px;
  border-top-color: ${({theme}) => theme.palette['gray-200']};
  margin-top: 40px;
`;

const StyledTouchableWorkoutListItem = styled.TouchableOpacity<{
  isSelected?: boolean;
}>`
  background-color: ${({isSelected = false, theme}) =>
    isSelected ? theme.palette['gray-200'] : theme.palette['gray-0']};
  height: 50px;
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
`;

const VerticalLine = styled.View<{
  height: string;
  color: keyof typeof theme.palette;
}>`
  height: ${({height}) => height};
  background-color: ${({theme, color}) => theme.palette[color]};
`;
