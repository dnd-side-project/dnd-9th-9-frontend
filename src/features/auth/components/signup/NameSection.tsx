/* eslint-disable @typescript-eslint/no-misused-promises */
import React from 'react';

import styled from '@emotion/native';
import {Controller} from 'react-hook-form';

import {Button} from '../../../../components/Button';
import {Text} from '../../../../components/Text';
import {Textfield} from '../../../../components/Textfield/Textfield';
import {type IFormSectionProps} from '../../../../screens/auth/SignupScreen';

export const NameSection = ({
  control,
  trigger,
  getFieldState,
  formState,
  watch,
  onNext,
}: IFormSectionProps): React.JSX.Element => {
  const error = formState.errors.name;

  const handlePressNext = async (): Promise<void> => {
    const isValid = await trigger('name');

    if (isValid) {
      setTimeout(() => {
        onNext();
      }, 500);
    }
  };

  return (
    <StyledSection>
      <StyledFieldContainer>
        <Text
          text="이름을 입력해 주세요"
          type="head3"
          fontWeight="600"
          style={{paddingTop: 32, paddingBottom: 42}}
        />
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

      <FixedButtonWrapper>
        <Button text="다음" onPress={handlePressNext} />
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
