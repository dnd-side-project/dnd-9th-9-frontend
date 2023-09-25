/* eslint-disable @typescript-eslint/no-misused-promises */
import React, {useEffect, useState} from 'react';

import styled from '@emotion/native';
import {Controller} from 'react-hook-form';
import {Pressable} from 'react-native';

import {ValidateGraph} from './ValidateGraph';
import {eyeClosedXmlData, eyeOpenedXmlData} from '../../../../../assets/svg';
import {Button} from '../../../../../components/Button';
import {Gap} from '../../../../../components/Gap';
import {Icon} from '../../../../../components/Icon';
import {Text} from '../../../../../components/Text';
import {Textfield} from '../../../../../components/Textfield/Textfield';
import {type IFormSectionProps} from '../../../../../screens/auth/SignupScreen';

export const PasswordSection = ({
  control,
  trigger,
  getFieldState,
  getValues,
  setValue,
  formState,
  onNext,
}: IFormSectionProps): React.JSX.Element => {
  const error = formState.errors.password;

  const [isSecureTextEntry, setIsSecureTextEntry] = useState(true);
  const [isConfirmedSecureTextEntry, setIsConfirmedSecureTextEntry] =
    useState(true);
  const [isConfirm, setIsConfirm] = useState(false);
  const [isConfirmSame, setIsConfirmSame] = useState(false);

  const isErrorConfirmedPassword =
    getFieldState('confirmedPassword').isDirty && !isConfirmSame;

  const handlePressNext = async (): Promise<void> => {
    const isValid = await trigger('password');

    if (isValid && !isConfirm) {
      setIsConfirm(true);
    }

    if (isConfirm && isConfirmSame) {
      onNext();
    }
  };

  useEffect(() => {
    if (getValues('confirmedPassword') != null) {
      setValue('confirmedPassword', '');
    }
  }, []);

  return (
    <StyledSection>
      <StyledFieldContainer>
        <Text
          text={isConfirm ? '비밀번호 확인' : '비밀번호를 입력해 주세요'}
          type="head3"
          fontWeight="600"
          style={{paddingTop: 32, paddingBottom: 42}}
        />
        {isConfirm && (
          <>
            <Controller
              control={control}
              name="confirmedPassword"
              rules={{
                onChange: () => {
                  const isSame =
                    getValues('password') === getValues('confirmedPassword');
                  setIsConfirmSame(isSame);
                },
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <Textfield
                  size="sm"
                  label="비밀번호 확인"
                  placeholder="영문, 숫자를 포함하여 입력해주세요."
                  textContentType="password"
                  secureTextEntry={isConfirmedSecureTextEntry}
                  maxLength={16}
                  value={value}
                  isError={isErrorConfirmedPassword}
                  errorMessage={
                    isErrorConfirmedPassword
                      ? '비밀번호가 일치하지 않아요.'
                      : ''
                  }
                  onBlur={onBlur}
                  onChangeText={onChange}
                  rightElement={() => (
                    <Pressable
                      onPress={() => {
                        setIsConfirmedSecureTextEntry(prev => !prev);
                      }}>
                      <Icon
                        svgXml={
                          isConfirmedSecureTextEntry
                            ? eyeClosedXmlData
                            : eyeOpenedXmlData
                        }
                      />
                    </Pressable>
                  )}
                />
              )}
            />
            <Gap size="50px" />
          </>
        )}
        <Controller
          control={control}
          name="password"
          rules={{
            onChange: () => {
              void trigger('password');
            },
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <Textfield
              size="sm"
              label="비밀번호"
              placeholder="영문, 숫자를 포함하여 입력해주세요."
              textContentType="password"
              secureTextEntry={isSecureTextEntry}
              editable={!isConfirm}
              maxLength={16}
              value={value}
              errorMessage={error?.message}
              onBlur={onBlur}
              onChangeText={onChange}
              rightElement={() => (
                <Pressable
                  onPress={() => {
                    setIsSecureTextEntry(prev => !prev);
                  }}>
                  <Icon
                    svgXml={
                      isSecureTextEntry ? eyeClosedXmlData : eyeOpenedXmlData
                    }
                  />
                </Pressable>
              )}
            />
          )}
        />
        <Gap size="12px" />
        {!isConfirm && getFieldState('password').isDirty && (
          <ValidateGraph passwordLength={getValues('password')?.length} />
        )}
      </StyledFieldContainer>

      <FixedButtonWrapper>
        <Button
          text="다음"
          onPress={handlePressNext}
          disabled={
            getValues('password') == null ||
            getValues('password').length === 0 ||
            error?.message != null
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
