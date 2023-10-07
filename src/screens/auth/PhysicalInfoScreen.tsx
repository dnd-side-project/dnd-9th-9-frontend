import React from 'react';

import styled from '@emotion/native';
import {zodResolver} from '@hookform/resolvers/zod';
import {Controller, useForm} from 'react-hook-form';
import {SafeAreaView} from 'react-native';
import {z} from 'zod';

import {Button} from '../../components/Button';
import {Text} from '../../components/Text';
import {Textfield} from '../../components/Textfield/Textfield';
// import {usePatchMyOnboardProfile} from '../../features/my/hooks/profile';
// import {type TGender} from '../../features/my/types';

const validationSchema = z.object({
  weight: z
    .number()
    .gte(1, {message: '몸무게를 입력해주세요'})
    .lte(999, {message: '몸무게를 입력해주세요'})
    .refine(value => /\b\d[\d,.]*\b/.test(value.toString()), {
      message: '최소 1자 이상의 영문과 숫자를 포함해주세요',
    }),
  height: z
    .number()
    .gte(1, {message: '키를 입력해주세요'})
    .lte(999, {message: '키를 입력해주세요'}),
  gender: z.enum(['MALE', 'FEMALE']),
  // calorieGoal: z.string().min(6, {message: '6자 이상으로 입력해주세요'}),
});

type ValidationSchema = z.infer<typeof validationSchema>;

export const PhysicalInfoScreen = (): React.JSX.Element => {
  const {control, trigger, formState} = useForm<ValidationSchema>({
    resolver: zodResolver(validationSchema),
  });

  // const {mutate} = usePatchMyOnboardProfile();

  // const handlePressNext = async (): Promise<void> => {
  //   const isValid = await trigger('name');

  //   if (isValid) {
  //   }
  // };

  return (
    <SafeAreaView style={{backgroundColor: 'white', flex: 1}}>
      <StyledTopBar>
        <Text type="head4" text="[필수]" />
      </StyledTopBar>

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
            rules={{
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
                size="lg"
                maxLength={3}
                isError={formState.errors.weight != null}
                value={value?.toString()}
                onBlur={onBlur}
                onChangeText={text => {
                  onChange(+text);
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
                size="lg"
                maxLength={3}
                isError={formState.errors.height != null}
                value={value?.toString()}
                onBlur={onBlur}
                onChangeText={text => {
                  onChange(+text);
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
          <Button text="다음" onPress={() => {}} />
        </FixedButtonWrapper>
      </StyledSection>
    </SafeAreaView>
  );
};

const StyledTopBar = styled.View`
  display: flex;
  flex-direction: row;
  padding: 20px 16px;
  align-items: center;
  justify-content: flex-end;
`;

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
