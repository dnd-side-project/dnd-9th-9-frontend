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
import {KeyboardHidePressArea} from '../../components/KeyboardHidePressArea';
import {Text} from '../../components/Text';
import {
  MobilePhoneSection,
  IdSection,
  PasswordSection,
} from '../../features/auth/components/findPassword';
import {
  usePostAuthChangePassword,
  usePostLogin,
} from '../../features/auth/hooks/auth';
import Toast from '../../lib/toast';
import {type RootStackParamList} from '../../navigators';

type Props = NativeStackScreenProps<RootStackParamList, 'FindPassword'>;

const validationSchema = z.object({
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
  password: z
    .string()
    .min(8, {message: '비밀번호를 8글자 이상으로 입력해주세요'})
    .max(16, {message: '비밀번호를 16글자 이하로 입력해주세요'})
    .refine(value => /^(?=.*[a-zA-Z])(?=.*\d).+$/.test(value), {
      message: '최소 1자 이상의 영문과 숫자를 포함해주세요',
    }),
  confirmedPassword: z.string(),
});

type ValidationSchema = z.infer<typeof validationSchema>;

export interface IFormSectionProps extends UseFormReturn<ValidationSchema> {
  showLogin: boolean;
  onNext: () => void;
  onSubmit: () => void;
  onPressLogin: () => void;
}

const FIND_PASSWORD_INFORMATION_STEPS = [
  {
    info: '아이디',
    formSection: IdSection,
  },
  {
    info: '전화번호 인증',
    formSection: MobilePhoneSection,
  },
  {
    info: '비밀번호 재설정',
    formSection: PasswordSection,
  },
] as const;

export function FindPasswordScreen({navigation}: Props): React.JSX.Element {
  const findPasswordForm = useForm<ValidationSchema>({
    resolver: zodResolver(validationSchema),
  });

  const [stepIndex, setStepIndex] = useState(0);
  const currentStep = FIND_PASSWORD_INFORMATION_STEPS[stepIndex];
  const stepLabel = `${stepIndex + 1}/${
    FIND_PASSWORD_INFORMATION_STEPS.length
  }`;
  const [showLogin, setShowLogin] = useState(false);

  const handlePressNext = async (): Promise<void> => {
    if (stepIndex === FIND_PASSWORD_INFORMATION_STEPS.length - 1) {
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

  const {mutate: postAuthChangePassword} = usePostAuthChangePassword({
    onSuccessCallback: () => {
      Toast.show({message: '비밀번호가 재설정되었습니다.'});
      setShowLogin(true);
    },
    onErrorCallback: error => {
      Toast.show({
        message:
          error.response?.data.message ?? '비밀번호 재설정에 실패하였습니다.',
      });
      navigation.popToTop();
    },
  });

  const {mutate: postLogin} = usePostLogin({
    onSuccessCallback: () => {
      navigation.replace('Main');
    },
    onErrorCallback: error => {
      Toast.show({
        message: error.response?.data.message ?? '로그인에 실패하였습니다.',
      });
      navigation.popToTop();
    },
  });

  const handlePressSubmit = async (): Promise<void> => {
    postAuthChangePassword({
      body: {
        uid: findPasswordForm.getValues('uid'),
        phoneNum: findPasswordForm.getValues('mobilePhone'),
        newPassword: findPasswordForm.getValues('password'),
        confirmPassword: findPasswordForm.getValues('confirmedPassword'),
      },
    });
  };

  const handlePressLogin = (): void => {
    postLogin({
      body: {
        uid: findPasswordForm.getValues('uid'),
        password: findPasswordForm.getValues('password'),
      },
    });
  };

  return (
    <KeyboardHidePressArea>
      <SafeAreaView style={{backgroundColor: 'white', flex: 1}}>
        <StyledTopBar>
          <TouchableOpacity onPress={handlePressPrev}>
            <Icon svgXml={arrowLeftXmlData} height={32} width={32} />
          </TouchableOpacity>
          <Text type="head4" text={stepLabel} color="gray-500" />
        </StyledTopBar>

        <currentStep.formSection
          showLogin={showLogin}
          onNext={handlePressNext}
          onSubmit={handlePressSubmit}
          onPressLogin={handlePressLogin}
          {...findPasswordForm}
        />
      </SafeAreaView>
    </KeyboardHidePressArea>
  );
}

const StyledTopBar = styled.View`
  display: flex;
  flex-direction: row;
  padding: 20px 16px;
  align-items: center;
  justify-content: space-between;
`;
