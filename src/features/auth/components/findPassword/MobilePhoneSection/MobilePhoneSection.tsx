import React, {useState} from 'react';

import styled from '@emotion/native';

import {SendCodeSection} from './SendCodeSection';
import {VerifySection} from './VerifySection';
import {ConfirmModal} from '../../../../../components/Modal';
import {Text} from '../../../../../components/Text';
import {type IFormSectionProps} from '../../../../../screens/auth/FindPasswordScreen';

export const MobilePhoneSection = (
  props: IFormSectionProps,
): React.JSX.Element => {
  const [isVerifySection, setIsVerifySection] = useState(false);

  const [isSuccessModalOpened, setIsSuccessModalOpened] = useState(false);
  const [isFailureModalOpened, setIsFailureModalOpened] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSuccessSendCode = (): void => {
    setIsSuccessModalOpened(true);
  };

  const handleFailSendCode = (errorMessage?: string): void => {
    setIsFailureModalOpened(true);
    setErrorMessage(
      errorMessage ?? `현재 전화번호 인증 서비스를\n 이용할 수 없습니다.`,
    );
  };

  return (
    <StyledSection>
      <StyledFieldContainer>
        <Text
          text={isVerifySection ? '인증번호 확인' : '전화번호 인증'}
          type="head3"
          fontWeight="600"
          style={{paddingTop: 32, paddingBottom: 42}}
        />
      </StyledFieldContainer>
      {isVerifySection ? (
        <VerifySection
          {...props}
          onSuccessSendCode={handleSuccessSendCode}
          onFailSendCode={handleFailSendCode}
        />
      ) : (
        <SendCodeSection
          {...props}
          onNext={() => {
            setIsVerifySection(true);
          }}
          onSuccessSendCode={handleSuccessSendCode}
          onFailSendCode={handleFailSendCode}
        />
      )}

      <ConfirmModal
        visible={isSuccessModalOpened}
        title={`입력하신 전화번호로\n 인증번호가 발송되었어요.`}
        subTitle="문자를 확인 후, 인증번호를 입력해 주세요."
        handleConfirm={() => {
          setIsSuccessModalOpened(false);
        }}
      />
      <ConfirmModal
        visible={isFailureModalOpened}
        title={errorMessage}
        subTitle="잠시후 다시 시도해주세요"
        handleConfirm={() => {
          setIsFailureModalOpened(false);
        }}
      />
    </StyledSection>
  );
};

const StyledSection = styled.View`
  flex-direction: column;
  flex: 1;
`;

const StyledFieldContainer = styled.View`
  padding: 0 16px;
`;
