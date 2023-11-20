import React from 'react';

import styled from '@emotion/native';
import {Controller} from 'react-hook-form';

import {Text} from '../../../../../components/Text';
import {Textfield} from '../../../../../components/Textfield/Textfield';
import {type IFormSectionProps} from '../../../../../screens/my/profile/MyProfileModifyScreen';

export const ModifyCalorieGoalSection = ({
  control,
  trigger,
  formState,
  getValues,
}: IFormSectionProps): React.JSX.Element => {
  const error = formState.errors.calorieGoal;

  return (
    <StyledSection>
      <StyledFieldContainer>
        <Controller
          control={control}
          name="calorieGoal"
          rules={{
            onChange: () => {
              console.log(getValues('calorieGoal'), error);
              void trigger('calorieGoal');
            },
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <Textfield
              label="목표 칼로리"
              keyboardType="numeric"
              placeholder="300kcal"
              isError={error != null}
              value={`${value}`}
              rightElement={() => <Text text="kcal" type="body2" />}
              onBlur={onBlur}
              onChangeText={value => {
                onChange(+value.toString().replace(/[^0-9]+/g, ''));
              }}
              errorMessage={error?.message}
            />
          )}
        />
      </StyledFieldContainer>
    </StyledSection>
  );
};

const StyledSection = styled.View`
  flex-direction: column;
  flex: 1;
  justify-content: space-between;
  background-color: ${({theme}) => theme.palette['gray-0']};
`;

const StyledFieldContainer = styled.View`
  padding: 0 16px;
`;
