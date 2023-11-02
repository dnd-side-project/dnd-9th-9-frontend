import React from 'react';

import styled from '@emotion/native';
import {Controller} from 'react-hook-form';

import {Textfield} from '../../../../../components/Textfield/Textfield';
import {type IFormSectionProps} from '../../../../../screens/my/profile/MyProfileModifyScreen';

export const ModifyNameSection = ({
  control,
  trigger,
  getFieldState,
  formState,
}: IFormSectionProps): React.JSX.Element => {
  const error = formState.errors.name;

  return (
    <StyledSection>
      <StyledFieldContainer>
        <Controller
          control={control}
          name="name"
          rules={{
            onChange: () => {
              void trigger('name');
            },
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <Textfield
              label="이름"
              placeholder="홍길동"
              textContentType="name"
              isError={error != null}
              isValid={
                !getFieldState('name').invalid && getFieldState('name').isDirty
              }
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
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
