/* eslint-disable @typescript-eslint/no-misused-promises */
import React from 'react';

import styled from '@emotion/native';
import {Controller} from 'react-hook-form';

import {WorkoutLevelRadioGroup} from './WorkoutLevelRadioGroup';
import {Button} from '../../../../../components/Button';
import {Text} from '../../../../../components/Text';
import {type IFormSectionProps} from '../../../../../screens/auth/SignupScreen';

export const WorkoutLevelSection = ({
  control,
  trigger,
  getFieldState,
  onNext,
}: IFormSectionProps): React.JSX.Element => {
  const handlePressNext = async (): Promise<void> => {
    const isValid = await trigger('skillLevel');

    if (isValid) {
      onNext();
    }
  };

  return (
    <StyledSection>
      <StyledFieldContainer>
        <Text
          text="운동레벨을 선택해주세요"
          type="head3"
          fontWeight="600"
          style={{paddingTop: 32}}
        />
        <Text
          text="카테고리를 선택해주시면 더 정확한 매칭이 가능해요."
          type="caption"
          color="gray-700"
          style={{paddingTop: 18, paddingBottom: 42}}
        />
        <Controller
          control={control}
          name="skillLevel"
          rules={{
            onChange: () => {
              void trigger('skillLevel');
            },
          }}
          render={({field: {onChange, value}}) => (
            <WorkoutLevelRadioGroup selectedLevel={value} onChange={onChange} />
          )}
        />
      </StyledFieldContainer>

      <FixedButtonWrapper>
        <Button
          text="다음"
          onPress={handlePressNext}
          disabled={
            getFieldState('skillLevel').error != null ||
            !getFieldState('skillLevel').isDirty
          }
        />
      </FixedButtonWrapper>
    </StyledSection>
  );
};

const StyledSection = styled.View`
  flex-direction: column;
  flex: 1;
  justify-content: space-between;
`;

const StyledFieldContainer = styled.View`
  padding: 0 16px;
`;

const FixedButtonWrapper = styled.View`
  width: 100%;
`;
