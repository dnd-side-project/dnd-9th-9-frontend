/* eslint-disable @typescript-eslint/no-misused-promises */
import React, {useState} from 'react';

import styled from '@emotion/native';
import {zodResolver} from '@hookform/resolvers/zod';
import {type NativeStackScreenProps} from '@react-navigation/native-stack';
import dayjs from 'dayjs';
import {useForm, type UseFormReturn} from 'react-hook-form';
import {SafeAreaView, TouchableOpacity} from 'react-native';
import {z} from 'zod';

import {arrowLeftXmlData} from '../../assets/svg';
import {Icon} from '../../components/Icon';
import {ConfirmModal} from '../../components/Modal';
import {Text} from '../../components/Text';
import {
  NameSection,
  IdSection,
  MobilePhoneSection,
  PasswordSection,
  WorkoutLevelSection,
} from '../../features/auth/components/signup';
import {usePostLogin, usePostSignup} from '../../features/auth/hooks/auth';
import {type SkillLevels} from '../../features/match/const';
import {usePatchMyOnboardProfile} from '../../features/my/hooks/profile';
import {
  getActivitySummary,
  getAuthStatus,
  getBiologicalSex,
  getLatestHeight,
  getLatestWeight,
  HealthStatusCode,
  initHealthKit,
} from '../../lib/AppleHealthKit';
import {type RootStackParamList} from '../../navigators';

type Props = NativeStackScreenProps<RootStackParamList, 'Landing'>;

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
  password: z
    .string()
    .min(8, {message: '비밀번호를 8글자 이상으로 입력해주세요'})
    .max(16, {message: '비밀번호를 16글자 이하로 입력해주세요'})
    .refine(value => /^(?=.*[a-zA-Z])(?=.*\d).+$/.test(value), {
      message: '최소 1자 이상의 영문과 숫자를 포함해주세요',
    }),
  confirmedPassword: z.string(),
  skillLevel: z.string().nonempty('운동 레벨을 선택해주세요'),
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

export function SignupScreen({navigation}: Props): React.JSX.Element {
  const signupForm = useForm<ValidationSchema>({
    resolver: zodResolver(validationSchema),
  });

  const [stepIndex, setStepIndex] = useState(0);
  const currentStep = SIGNUP_INFORMATION_STEPS[stepIndex];
  const stepLabel = `${stepIndex + 1}/${SIGNUP_INFORMATION_STEPS.length}`;

  const {mutateAsync: postSignup, error: postSignupError} = usePostSignup();
  const {mutateAsync: postLogin, error: postLoginError} = usePostLogin();
  const [showErrorModal, setShowErrorModal] = useState(false);

  const {mutate: patchMyOnboardProfile} = usePatchMyOnboardProfile();

  const getIsLinkedUser = async (): Promise<boolean> => {
    const authStatus = await getAuthStatus();
    const isLinkedUser = !Object.values(authStatus.permissions)
      .flat()
      .some(permission => permission === HealthStatusCode.NotDetermined);
    return isLinkedUser;
  };

  const getHealthKitData = async (): Promise<{
    height: number | null;
    weight: number | null;
    gender: string | null;
    calorieGoal: number | null;
  }> => {
    // NOTE: data 없을 경우 error 발생
    const height = await getLatestHeight()
      .then(({value}) => value)
      .catch(() => null);

    const weight = await getLatestWeight()
      .then(({value}) => value)
      .catch(() => null);

    const gender = await getBiologicalSex()
      .then(({value}) => value)
      .catch(() => null);

    const calorieGoal = await getActivitySummary({
      startDate: dayjs().add(-6, 'month').toISOString(),
    })
      .then(data => data.at(-1)?.appleExerciseTimeGoal)
      .catch(() => null);

    return {
      height,
      weight,
      gender,
      calorieGoal: calorieGoal ?? null,
    };
  };

  const handlePressNext = async (): Promise<void> => {
    if (stepIndex === SIGNUP_INFORMATION_STEPS.length - 1) {
      try {
        await postSignup({
          body: {
            name: signupForm.getValues('name'),
            uid: signupForm.getValues('uid'),
            phoneNum: signupForm.getValues('mobilePhone'),
            password: signupForm.getValues('password'),
            // TODO(@minimalKim): zod enum check로 대체
            skillLevel: signupForm.getValues(
              'skillLevel',
            ) as keyof typeof SkillLevels,
          },
        });

        await postLogin({
          body: {
            uid: signupForm.getValues('uid'),
            password: signupForm.getValues('password'),
          },
        });
      } catch (e) {
        setShowErrorModal(true);
      }

      navigation.replace('Main');

      void initHealthKit();
      const isLinkedUser = await getIsLinkedUser();

      if (!isLinkedUser) {
        // TODO: 신체정보 페이지 이동
        return;
      }

      try {
        const data = await getHealthKitData();
        const hasSomeNullData = Object.values(data).some(
          value => value == null,
        );
        if (hasSomeNullData) {
          // TODO: 신체정보 페이지 이동
          console.log('신체정보 페이지 이동');
          return;
        }

        // @ts-expect-error NOTE: 위 if 문에서 null check가 되었음을 추론하는 type 추가 필요
        patchMyOnboardProfile({body: {...data, isAppleLinked: true}});
      } catch (error) {
        // TODO: 신체정보 페이지 이동
        console.log('신체정보 페이지 이동');
        return;
      }

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

  const handlePressConfirmError = (): void => {
    setShowErrorModal(false);
    navigation.pop();
  };

  return (
    <SafeAreaView style={{backgroundColor: 'white', flex: 1}}>
      <StyledTopBar>
        <TouchableOpacity onPress={handlePressPrev}>
          <Icon svgXml={arrowLeftXmlData} height={32} width={32} />
        </TouchableOpacity>
        <Text type="head4" text={stepLabel} color="gray-500" />
      </StyledTopBar>

      <ConfirmModal
        visible={showErrorModal}
        title={'회원가입에 실패했습니다'}
        subTitle={
          postSignupError?.message ??
          postLoginError?.message ??
          '다시 시도해주세요'
        }
        handleConfirm={handlePressConfirmError}
      />

      <currentStep.formSection onNext={handlePressNext} {...signupForm} />
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
