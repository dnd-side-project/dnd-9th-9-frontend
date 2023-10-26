/* eslint-disable @typescript-eslint/no-misused-promises */
import React from 'react';

import styled from '@emotion/native';
import {Controller} from 'react-hook-form';

import {Button} from '../../../../../components/Button';
import {Textfield} from '../../../../../components/Textfield/Textfield';
import {type IFormSectionProps} from '../../../../../screens/auth/FindPasswordScreen';
import {usePostSendCodeFindPassword} from '../../../hooks/verification';

interface ISendCodeSectionProps extends IFormSectionProps {
  onSuccessSendCode: () => void;
  onFailSendCode: (errorMessage?: string) => void;
}

export const SendCodeSection = ({
  control,
  trigger,
  getValues,
  formState,
  onNext,
  onSuccessSendCode,
  onFailSendCode,
}: ISendCodeSectionProps): React.JSX.Element => {
  const error = formState.errors.mobilePhone;

  const {mutate: postSendCode} = usePostSendCodeFindPassword({
    onSuccessCallback: () => {
      onNext();
      onSuccessSendCode();
    },
    onErrorCallback: error => {
      onFailSendCode(error.response?.data.message);
    },
  });

  const handlePressSendCode = async (): Promise<void> => {
    const isValid = await trigger('mobilePhone');
    if (!isValid) {
      return;
    }

    postSendCode({
      body: {
        uid: getValues('uid'),
        phoneNum: getValues('mobilePhone'),
      },
    });
  };

  const numberFormatter = (input?: string): string => {
    if (input == null) {
      return '';
    }
    if (input.length === 10) {
      return input.replace(/(\d{3})(\d{3})(\d{4})/, '$1 $2 $3');
    } else if (input.length === 11) {
      return input.replace(/(\d{3})(\d{4})(\d{4})/, '$1 $2 $3');
    }
    return input;
  };

  return (
    <StyledSection>
      <StyledFieldContainer>
        <Controller
          control={control}
          name="mobilePhone"
          rules={{
            onChange: () => {
              if (error != null) {
                void trigger('mobilePhone');
              }
            },
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <Textfield
              label="전화번호"
              placeholder="010 1234 5678"
              textContentType="telephoneNumber"
              isError={error != null}
              value={numberFormatter(value)}
              onBlur={onBlur}
              onChangeText={text => {
                onChange(text.replace(/[-\s]/g, ''));
              }}
              errorMessage={error?.message}
            />
          )}
        />
      </StyledFieldContainer>

      <FixedButtonWrapper>
        <Button text="인증 번호 전송" onPress={handlePressSendCode} />
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
