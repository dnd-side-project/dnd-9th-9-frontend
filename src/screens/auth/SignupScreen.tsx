import React, {useState} from 'react';

import styled from '@emotion/native';
import {zodResolver} from '@hookform/resolvers/zod';
import {useForm, type UseFormReturn} from 'react-hook-form';
import {SafeAreaView, TouchableOpacity} from 'react-native';
import {z} from 'zod';

import {arrowLeftXmlData} from '../../assets/svg';
import {Icon} from '../../components/Icon';
import {Text} from '../../components/Text';
import {
  NameSection,
  IdSection,
  MobilePhoneSection,
  PasswordSection,
  WorkoutLevelSection,
} from '../../features/auth/components/signup';

const validationSchema = z
  .object({
    name: z.string().min(1, {message: '이름을 입력해주세요'}),
    uid: z
      .string()
      .min(6, {message: '6자 이상으로 입력해주세요'})
      .refine(value => /^(?=.*[a-zA-Z])(?=.*\d).+$/.test(value), {
        message: '최소 1자 이상의 영문과 숫자를 포함해주세요',
      }),
    password: z
      .string()
      .min(6, {message: '비밀번호를 6글자 이상으로 입력해주세요'}),
    confirmPassword: z
      .string()
      .min(1, {message: '비밀번호 확인을 입력해주세요'}),
    mobilePhone: z
      .string()
      .min(1, {message: '핸드폰 번호를 입력해주세요'})
      .refine(
        value =>
          /^((\+?82)[ -]?)?0?1([0|1|6|7|8|9]{1})[ -]?\d{3,4}[ -]?\d{4}$/.test(
            value,
          ),
        {message: '유효한 핸드폰 번호를 입력해주세요'},
      ),
    mobilePhoneVerifyCode: z
      .string()
      .min(1, '인증번호를 입력해주세요')
      .refine(value => /^\d+$/.test(value), {
        message: '잘못된 인증번호입니다. 인증번호는 숫자만 입력해 주세요.',
      }),
    skillLevel: z.string().min(1, {message: '운동 강도를 입력해주세요'}),
  })
  .refine(data => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: "Password don't match",
  });

type ValidationSchema = z.infer<typeof validationSchema>;

export interface IFormSectionProps extends UseFormReturn<ValidationSchema> {
  onNext: () => void;
}

const SIGNUP_INFORMATION_STEPS = [
  {
    info: '이름',
    formSection: NameSection,
  },
  {
    info: '아이디',
    formSection: IdSection,
  },
  {
    info: '전화번호 인증',
    formSection: MobilePhoneSection,
  },
  {
    info: '비밀번호',
    formSection: PasswordSection,
  },
  {
    info: '운동레벨',
    formSection: WorkoutLevelSection,
  },
] as const;

export function SignupScreen(): React.JSX.Element {
  const signupForm = useForm<ValidationSchema>({
    resolver: zodResolver(validationSchema),
  });

  const [stepIndex, setStepIndex] = useState(0);
  const currentStep = SIGNUP_INFORMATION_STEPS[stepIndex];
  const stepLabel = `${stepIndex + 1}/${SIGNUP_INFORMATION_STEPS.length}`;

  const handlePressNext = (): void => {
    if (stepIndex === 0) {
      // TODO: navigate 랜딩
    }
    setStepIndex(index => index + 1);
  };

  const handlePressPrev = (): void => {
    setStepIndex(index => index - 1);
  };

  return (
    <SafeAreaView style={{backgroundColor: 'white', flex: 1}}>
      <StyledTopBar>
        <TouchableOpacity onPress={handlePressPrev}>
          <Icon svgXml={arrowLeftXmlData} height={32} width={32} />
        </TouchableOpacity>
        <Text type="head4" text={stepLabel} color="gray-500" />
      </StyledTopBar>

      {<currentStep.formSection onNext={handlePressNext} {...signupForm} />}

      {/* <Button
        text="Submit"
        onPress={() => {
          void handleSubmit(onSubmit)();
        }}
      /> */}
    </SafeAreaView>
  );
}

const StyledTopBar = styled.View`
  display: flex;
  flex-direction: row;
  padding: 20px 16px;
  align-items: center;
  justify-content: space-between;
`;
