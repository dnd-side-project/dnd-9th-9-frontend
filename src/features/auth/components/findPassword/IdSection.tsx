import React from 'react';

import styled from '@emotion/native';
import {Controller} from 'react-hook-form';

import {Button} from '../../../../components/Button';
import {Text} from '../../../../components/Text';
import {Textfield} from '../../../../components/Textfield/Textfield';
import {type IFormSectionProps} from '../../../../screens/auth/FindPasswordScreen';

export const IdSection = ({
  control,
  trigger,
  formState,
  getValues,
  onNext,
}: IFormSectionProps): React.JSX.Element => {
  const error = formState.errors.uid;

  const handlePressNext = async (): Promise<void> => {
    const isValid = await trigger('uid');

    if (isValid) {
      onNext();
    }
  };

  return (
    <StyledSection>
      <StyledFieldContainer>
        <Text
          text="아이디를 입력해 주세요"
          type="head3"
          fontWeight="600"
          style={{paddingTop: 32, paddingBottom: 42}}
        />
        <Controller
          control={control}
          name="uid"
          render={({field: {onChange, onBlur, value}}) => (
            <Textfield
              label="아이디"
              textContentType="nickname"
              isError={error?.message != null}
              value={value}
              errorMessage={error?.message}
              onBlur={onBlur}
              onChangeText={onChange}
            />
          )}
        />
      </StyledFieldContainer>

      <FixedButtonWrapper>
        <Button
          text="다음"
          onPress={() => {
            void handlePressNext();
          }}
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
