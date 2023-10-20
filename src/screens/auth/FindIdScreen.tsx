/* eslint-disable @typescript-eslint/no-misused-promises */
import React, {useState} from 'react';

import styled from '@emotion/native';
import {zodResolver} from '@hookform/resolvers/zod';
import {type NativeStackScreenProps} from '@react-navigation/native-stack';
import {useForm, type UseFormReturn} from 'react-hook-form';
import {SafeAreaView, TouchableOpacity} from 'react-native';
import {z} from 'zod';

import {arrowLeftXmlData} from '../../assets/svg';
import {Icon} from '../../components/Icon';
import {Text} from '../../components/Text';
import {
  NameSection,
  MobilePhoneSection,
  FindIdSection,
} from '../../features/auth/components/findId';
import {type RootStackParamList} from '../../navigators';

type Props = NativeStackScreenProps<RootStackParamList, 'FindId'>;

const validationSchema = z.object({
  name: z.string().min(1, {message: '이름을 입력해주세요'}),
  uid: z
    .string()
    .min(6, {message: '6자 이상으로 입력해주세요'})
    .refine(value => /^(?=.*[a-zA-Z])(?=.*\d).+$/.test(value), {
      message: '최소 1자 이상의 영문과 숫자를 포함해주세요',
    }),
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
});

type ValidationSchema = z.infer<typeof validationSchema>;

export interface IFormSectionProps extends UseFormReturn<ValidationSchema> {
  onNext: () => void;
  onPressSignin: () => void;
  onPressLogin: () => void;
  onPressFindPassword: () => void;
}

const FIND_ID_INFORMATION_STEPS = [
  {
    info: '이름',
    formSection: NameSection,
  },
  {
    info: '전화번호 인증',
    formSection: MobilePhoneSection,
  },
  {
    info: '아이디 찾기',
    formSection: FindIdSection,
  },
] as const;

export function FindIdScreen({navigation}: Props): React.JSX.Element {
  const findIdForm = useForm<ValidationSchema>({
    resolver: zodResolver(validationSchema),
  });

  const [stepIndex, setStepIndex] = useState(0);
  const currentStep = FIND_ID_INFORMATION_STEPS[stepIndex];
  const stepLabel = `${stepIndex + 1}/${FIND_ID_INFORMATION_STEPS.length}`;

  const handlePressNext = async (): Promise<void> => {
    if (stepIndex === FIND_ID_INFORMATION_STEPS.length - 1) {
      return;
    }
    setStepIndex(index => index + 1);
  };

  const handlePressPrev = (): void => {
    if (stepIndex === 0) {
      navigation.pop();
      return;
    }
    setStepIndex(index => index - 1);
  };

  const handlePressSignin = (): void => {
    navigation.replace('Signup');
  };

  const handlePressLogin = (): void => {
    navigation.replace('Login');
  };

  const handlePressFindPassword = (): void => {
    navigation.replace('FindId');
  };

  return (
    <SafeAreaView style={{backgroundColor: 'white', flex: 1}}>
      <StyledTopBar>
        <TouchableOpacity onPress={handlePressPrev}>
          <Icon svgXml={arrowLeftXmlData} height={32} width={32} />
        </TouchableOpacity>
        <Text type="head4" text={stepLabel} color="gray-500" />
      </StyledTopBar>

      <currentStep.formSection
        onNext={handlePressNext}
        onPressSignin={handlePressSignin}
        onPressLogin={handlePressLogin}
        onPressFindPassword={handlePressFindPassword}
        {...findIdForm}
      />
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
