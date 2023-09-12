import React, {useMemo, useState} from 'react';

import styled from '@emotion/native';
import {Controller} from 'react-hook-form';

import {Button} from '../../../../components/Button';
import {Text} from '../../../../components/Text';
import {Textfield} from '../../../../components/Textfield/Textfield';
import {type IFormSectionProps} from '../../../../screens/auth/SignupScreen';
import {useGetAuthIdAvailable} from '../../hooks/auth';

export const IdSection = ({
  control,
  trigger,
  formState,
  onNext,
}: IFormSectionProps): React.JSX.Element => {
  const [enabled, setEnabled] = useState(false);
  const [uid, setUid] = useState('');
  const error = formState.errors.uid;

  const {data: isIdAvailable, refetch: getAuthIdAvailable} =
    useGetAuthIdAvailable({
      uid,
      enabled,
    });

  const errorMessage = useMemo(() => {
    if (error?.message != null) {
      return error?.message;
    }
    if (isIdAvailable === false && enabled) {
      return '이미 사용중인 아이디 입니다.';
    }
    return '';
  }, [error, isIdAvailable]);

  const handlePressCheckAvailableId = (): void => {
    setEnabled(true);
    void getAuthIdAvailable();
  };

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
          rules={{
            onChange: ({target}) => {
              void trigger('uid');
              setUid(target.value);
              if (enabled) {
                setEnabled(false);
              }
            },
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <Textfield
              label="아이디"
              placeholder="6자 이상 영문+숫자 조합으로 만들어 주세요"
              textContentType="nickname"
              isError={error != null}
              isValid={isIdAvailable}
              value={value}
              errorMessage={errorMessage}
              hintMessage={
                isIdAvailable === true ? '사용 가능한 아이디 입니다.' : ''
              }
              onBlur={onBlur}
              onChangeText={onChange}
            />
          )}
        />
      </StyledFieldContainer>

      <FixedButtonWrapper>
        {isIdAvailable === true ? (
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          <Button text="다음" onPress={handlePressNext} />
        ) : (
          <Button text="중복확인" onPress={handlePressCheckAvailableId} />
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
