import React, {useEffect} from 'react';

import styled from '@emotion/native';
import {zodResolver} from '@hookform/resolvers/zod';
import {Controller, useForm} from 'react-hook-form';
import {z} from 'zod';

import {Button} from '../../../../components/Button';
import {Text} from '../../../../components/Text';
import {Textfield} from '../../../../components/Textfield/Textfield';
import {usePatchMyOnboardProfile} from '../../../../features/my/hooks/profile';
import {type TGender} from '../../../../features/my/types';

const validationSchema = z.object({
  weight: z
    .number()
    .gte(1, {message: '몸무게를 입력해주세요'})
    .lte(999, {message: '최대 입력 가능 몸무게는 999kg 입니다'}),
  height: z
    .number()
    .gte(1, {message: '키를 입력해주세요'})
    .lte(999, {message: '최대 입력 가능 키는 999cm 입니다'}),
  gender: z.enum(['MALE', 'FEMALE']),
});

type ValidationSchema = z.infer<typeof validationSchema>;

interface IPhysicalInfoForm {
  defaultWeight?: number;
  defaultHeight?: number;
  defaultGender?: TGender;
  isAllLinked: boolean;
  onNext: () => void;
}

export const PhysicalInfoForm = ({
  defaultWeight,
  defaultHeight,
  defaultGender,
  isAllLinked,
  onNext,
}: IPhysicalInfoForm): React.JSX.Element => {
  const {mutate: patchMyOnboardProfile} = usePatchMyOnboardProfile();

  const {control, trigger, formState, getValues, setValue} =
    useForm<ValidationSchema>({
      resolver: zodResolver(validationSchema),
      // defaultValues: {
      //   weight: defaultWeight,
      //   height: defaultHeight ?? undefined,
      //   gender: defaultGender ?? undefined,
      // },
    });

  const handlePressNext = async (): Promise<void> => {
    /* TODO(@minimalKim):
     * "error-message": "애플 연동 유저인 경우 목표 칼로리 값을 전송해야 합니다."
     * 애플 연동 유저지만 목표 칼로리 값 없는 경우 고려 필요
     */
    patchMyOnboardProfile({
      body: {
        weight: getValues().weight,
        height: getValues().height,
        gender: getValues().gender,
        isAppleLinked: isAllLinked,
      },
    });

    onNext();
  };

  // NOTE: 위 useForm defaultValues 미작동으로 인한 추가
  useEffect(() => {
    defaultWeight != null && setValue('weight', +defaultWeight);
    defaultHeight != null && setValue('height', +defaultHeight);
    defaultGender != null && setValue('gender', defaultGender);
    void trigger();
  }, [defaultWeight, defaultHeight, defaultGender]);

  return (
    <StyledSection>
      <StyledFieldContainer>
        <Text
          text="신체정보를 입력해 주세요."
          type="head3"
          fontWeight="600"
          style={{paddingBottom: 42}}
        />
        <Controller
          control={control}
          name="weight"
          defaultValue={defaultWeight}
          rules={{
            required: '몸무게를 입력해주세요',
            onChange: () => {
              void trigger('weight');
            },
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <Textfield
              label="몸무게"
              placeholder="0"
              keyboardType="numeric"
              textAlign="center"
              type="head2"
              maxLength={3}
              isError={formState.errors.weight != null}
              value={value?.toString()}
              onBlur={onBlur}
              onChangeText={text => {
                onChange(+text.toString().replace(/[^0-9]+/g, ''));
              }}
              errorMessage={formState.errors.weight?.message}
              rightElement={() => <Text text="kg" type="body2" />}
            />
          )}
        />

        <Controller
          control={control}
          name="height"
          rules={{
            required: '키를 입력해주세요',
            onChange: () => {
              void trigger('height');
            },
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <Textfield
              label="키"
              placeholder="0"
              keyboardType="numeric"
              textAlign="center"
              type="head2"
              maxLength={3}
              isError={formState.errors.height != null}
              value={value?.toString()}
              onBlur={onBlur}
              onChangeText={text => {
                onChange(+text.toString().replace(/[^0-9]+/g, ''));
              }}
              errorMessage={formState.errors.height?.message}
              rightElement={() => <Text text="cm" type="body2" />}
            />
          )}
        />

        <Controller
          control={control}
          name="gender"
          rules={{
            onChange: () => {
              void trigger('gender');
            },
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <>
              <Text text="성별" type="caption" color="gray-600" />
              <StyledRadiosButtonContainer>
                <StyledRadioButton
                  isSelected={value === 'FEMALE'}
                  onPress={() => {
                    onChange('FEMALE');
                  }}>
                  <Text
                    type="head3"
                    text="여성"
                    color={value === 'FEMALE' ? 'black' : 'gray-100'}
                  />
                </StyledRadioButton>
                <StyledRadioButton
                  isSelected={value === 'MALE'}
                  onPress={() => {
                    onChange('MALE');
                  }}>
                  <Text
                    type="head3"
                    text="남성"
                    color={value === 'MALE' ? 'black' : 'gray-100'}
                  />
                </StyledRadioButton>
              </StyledRadiosButtonContainer>
            </>
          )}
        />
      </StyledFieldContainer>
      <FixedButtonWrapper>
        <Button
          text="다음"
          disabled={!formState.isValid}
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
  background-color: white;
`;

const StyledFieldContainer = styled.View`
  padding: 0 16px;
  gap: 20px;
`;

const FixedButtonWrapper = styled.View`
  width: 100%;
`;

const StyledRadiosButtonContainer = styled.View`
  display: flex;
  flex-direction: row;
  gap: 16px;
`;

const StyledRadioButton = styled.TouchableOpacity<{isSelected?: boolean}>`
  border-bottom-width: 2px;
  border-bottom-color: ${({isSelected = false, theme}) =>
    isSelected ? theme.palette.black : theme.palette['gray-100']};
  display: flex;
  align-items: center;
  flex: 1;
  padding: 8px 0;
`;
