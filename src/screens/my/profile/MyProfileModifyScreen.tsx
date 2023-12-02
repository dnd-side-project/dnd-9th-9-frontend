import React from 'react';

import styled from '@emotion/native';
import {zodResolver} from '@hookform/resolvers/zod';
import {
  useNavigation,
  useRoute,
  type RouteProp,
} from '@react-navigation/native';
import {type NativeStackNavigationProp} from '@react-navigation/native-stack';
import {type UseFormReturn, useForm} from 'react-hook-form';
import {TouchableOpacity, View} from 'react-native';
import {z} from 'zod';

import {theme} from '../../../assets/styles/theme';
import {Gap} from '../../../components/Gap';
import {Text} from '../../../components/Text';
import {TopBar} from '../../../components/TopBar';
import {
  ModifyCalorieGoalSection,
  ModifyNameSection,
  ModifyWeightSection,
} from '../../../features/my/components/profile/modify';
import {useGetMyProfileDetail} from '../../../features/my/hooks/profile';
import {type MyStackParamList} from '../../../navigators/MyNavigator';

const validationSchema = z.object({
  name: z.string().min(1, {message: '이름을 입력해주세요'}),
  weight: z
    .number()
    .gte(1, {message: '몸무게를 입력해주세요'})
    .lte(999, {message: '최대 입력 가능 몸무게는 999kg 입니다'}),
  calorieGoal: z
    .number()
    .gte(1, {message: '목표 칼로리를 입력해주세요'})
    .lte(9999, {message: '최대 입력 가능 칼로리는 9999kcal 입니다'}),
});

type ValidationSchema = z.infer<typeof validationSchema>;

export type TMyProfileModifyScreenSectionType = keyof ValidationSchema;

export interface IFormSectionProps extends UseFormReturn<ValidationSchema> {}

const MY_PROFILE_MODIFY_SECTIONS: Record<
  TMyProfileModifyScreenSectionType,
  (props: IFormSectionProps) => React.JSX.Element
> = {
  name: ModifyNameSection,
  weight: ModifyWeightSection,
  calorieGoal: ModifyCalorieGoalSection,
} as const;

export function MyProfileModifyScreen(): React.JSX.Element {
  const navigation =
    useNavigation<NativeStackNavigationProp<MyStackParamList>>();
  const {params} = useRoute<RouteProp<MyStackParamList, 'MyProfileModify'>>();

  const {data: myProfileDetail} = useGetMyProfileDetail();
  const profileForm = useForm<ValidationSchema>({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      name: myProfileDetail?.name,
      weight: myProfileDetail?.weight,
      calorieGoal: myProfileDetail?.calorieGoal,
    },
  });

  const handleTopBarSave = async (): Promise<void> => {
    const isValid = await profileForm.trigger(params.type);
    if (isValid) {
      navigation.pop();
    }
    // TODO(@minimalKim): type별 patch
  };

  const SectionComponent = MY_PROFILE_MODIFY_SECTIONS[params.type];

  return (
    <>
      <View style={{backgroundColor: theme.palette['gray-0']}} />
      <TopBar
        headerText="프로필 편집"
        showBackButton
        rightComponent={() => (
          <TouchableOpacity
            onPress={() => {
              void handleTopBarSave();
            }}>
            <Text text="저장" type="body1" color="gray-700" />
          </TouchableOpacity>
        )}
      />
      <StyledContainer>
        <Gap size="30px" />
        <SectionComponent {...profileForm} />
      </StyledContainer>
    </>
  );
}

const StyledContainer = styled.View`
  background-color: ${({theme}) => theme.palette['gray-0']};
  height: 100%;
`;
