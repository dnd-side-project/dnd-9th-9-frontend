/* eslint-disable @typescript-eslint/no-misused-promises */
import React, {useEffect, useMemo, useState} from 'react';

import styled from '@emotion/native';
import {Controller} from 'react-hook-form';

import {Button} from '../../../../../components/Button';
import {Textfield} from '../../../../../components/Textfield/Textfield';
import {useInterval} from '../../../../../hooks/common';
import {type IFormSectionProps} from '../../../../../screens/auth/FindIdScreen';
import {usePostVerify, usePostSendCode} from '../../../hooks/verification';

interface IVerifySectionProps extends IFormSectionProps {
  onSuccessSendCode: () => void;
  onFailSendCode: () => void;
}

export const VerifySection = ({
  control,
  trigger,
  getValues,
  formState,
  setValue,
  onNext,
  onSuccessSendCode,
  onFailSendCode,
}: IVerifySectionProps): React.JSX.Element => {
  const error = formState.errors.mobilePhoneVerifyCode;

  const {mutateAsync: postSendCode} = usePostSendCode();
  const {
    mutate: postVerify,
    data: isVerify,
    isError: isErrorPostVerify,
  } = usePostVerify();

  const [timer, setTimer] = useState<number | null>(null);
  const formattedTime = useMemo(() => {
    if (timer === null) return '';
    const hour = Math.floor(timer / 60);
    const minute = (timer % 60).toString().padStart(2, '0');
    return `${hour}:${minute}`;
  }, [timer]);

  const [delay, setDelay] = useState<number | null>(null);

  const startTimer = (time: number = 10 * 60): void => {
    setTimer(time);
    setDelay(1000);
  };

  const stopTimer = (): void => {
    setDelay(null);
  };

  const hideTimer = (): void => {
    setTimer(null);
  };

  useInterval(() => {
    setTimer(prev => {
      if (prev === null) return prev;
      return Math.max(prev - 1, 0);
    });
  }, delay);

  useEffect(() => {
    if (timer === null) return;
    if (timer <= 0) stopTimer();
  }, [timer]);

  useEffect(() => {
    if (
      getValues('mobilePhoneVerifyCode') == null ||
      getValues('mobilePhoneVerifyCode') === ''
    ) {
      startTimer();
    } else {
      setValue('mobilePhoneVerifyCode', '');
      startTimer();
    }
  }, []);

  const handlePressReSendCode = (): void => {
    const phoneNum = getValues('mobilePhone');
    try {
      void postSendCode({
        body: {
          phoneNum,
        },
      });
      onSuccessSendCode();
      startTimer();
    } catch (error) {
      onFailSendCode();
    }
  };

  const handlePressVerifyCode = async (): Promise<void> => {
    const phoneNum = getValues('mobilePhone');
    const isValid = await trigger('mobilePhoneVerifyCode');

    if (isValid) {
      postVerify({
        body: {
          phoneNum,
          code: getValues('mobilePhoneVerifyCode'),
          verifyingType: 'FIND_ID',
        },
      });
      stopTimer();
      hideTimer();
    }
  };

  return (
    <StyledSection>
      <StyledFieldContainer>
        <Controller
          control={control}
          name="mobilePhoneVerifyCode"
          render={({field: {onChange, onBlur, value}}) => (
            <Textfield
              label="인증번호"
              placeholder="숫자로 된 인증번호 6자리를 입력해 주세요"
              textContentType="telephoneNumber"
              isError={error != null || timer === 0 || isErrorPostVerify}
              isValid={isVerify}
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
              errorMessage={
                isErrorPostVerify
                  ? '인증번호가 일치하지 않습니다.'
                  : timer === 0
                  ? '인증번호 유효시간이 지났습니다. 하단의 버튼을 눌러 재전송해 주세요.'
                  : error?.message
              }
              hintMessage={
                timer != null ? `인증번호 유효시간 ${formattedTime}` : ''
              }
            />
          )}
        />
      </StyledFieldContainer>

      <FixedButtonWrapper>
        {isVerify != null ? (
          <Button
            text="다음"
            onPress={() => {
              onNext();
            }}
          />
        ) : timer === 0 ? (
          <Button text="인증 번호 재전송" onPress={handlePressReSendCode} />
        ) : (
          <Button text="확인" onPress={handlePressVerifyCode} />
        )}
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
