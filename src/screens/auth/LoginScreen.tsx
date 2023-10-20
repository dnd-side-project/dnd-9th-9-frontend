import React, {useState} from 'react';

import styled from '@emotion/native';
import {zodResolver} from '@hookform/resolvers/zod';
import {type NativeStackScreenProps} from '@react-navigation/native-stack';
import {Controller, useForm} from 'react-hook-form';
import {Pressable, SafeAreaView} from 'react-native';
import {z} from 'zod';

import {
  arrowLeftXmlData,
  eyeClosedXmlData,
  eyeOpenedXmlData,
} from '../../assets/svg';
import {Button} from '../../components/Button';
import {Icon} from '../../components/Icon';
import {Text} from '../../components/Text';
import {Textfield} from '../../components/Textfield/Textfield';
import {usePostLogin} from '../../features/auth/hooks/auth';
import Toast from '../../lib/toast';
import {type RootStackParamList} from '../../navigators';

// TODO(@minimalKim): 디자인 QA 시 validate 시점 확인 필요
const validationSchema = z.object({
  uid: z
    .string()
    .min(6, {message: '6자 이상으로 입력해주세요'})
    .refine(value => /^(?=.*[a-zA-Z])(?=.*\d).+$/.test(value), {
      message: '최소 1자 이상의 영문과 숫자를 포함해주세요',
    }),
  password: z
    .string()
    .min(8, {message: '비밀번호를 8글자 이상으로 입력해주세요'})
    .max(16, {message: '비밀번호를 16글자 이하로 입력해주세요'})
    .refine(value => /^(?=.*[a-zA-Z])(?=.*\d).+$/.test(value), {
      message: '최소 1자 이상의 영문과 숫자를 포함해주세요',
    }),
});

type ValidationSchema = z.infer<typeof validationSchema>;

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

export const LoginScreen = ({navigation}: Props): React.JSX.Element => {
  const [isSecureTextEntry, setIsSecureTextEntry] = useState(true);
  const {control, trigger, formState, getValues} = useForm<ValidationSchema>({
    resolver: zodResolver(validationSchema),
  });

  const {mutate: postLogin} = usePostLogin({
    onSuccessCallback: () => {
      navigation.navigate('Main');
    },
    onErrorCallback: error => {
      Toast.show({
        message: error.response?.data.message ?? '로그인에 실패하였습니다.',
      });
    },
  });

  const handlePressSubmit = async (): Promise<void> => {
    const isUidValid = await trigger('uid');
    const isPasswordValid = await trigger('password');
    if (!isUidValid || !isPasswordValid) return;

    postLogin({
      body: {
        uid: getValues('uid'),
        password: getValues('password'),
      },
    });
  };

  return (
    <SafeAreaView
      style={{
        backgroundColor: 'white',
        flex: 1,
      }}>
      <StyledTopBar>
        <StyledBackButton
          onPress={() => {
            navigation.pop();
          }}>
          <Icon svgXml={arrowLeftXmlData} height={32} width={32} />
        </StyledBackButton>
      </StyledTopBar>

      <StyledSection>
        <Text text="일반 로그인" type="head3" fontWeight="600" />

        <StyledFieldContainer>
          <Controller
            control={control}
            name="uid"
            rules={{
              required: '아이디를 입력해주세요',
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <Textfield
                label="아이디"
                textContentType="nickname"
                isError={formState.errors.uid != null}
                value={value}
                errorMessage={formState.errors.uid?.message}
                onBlur={onBlur}
                onChangeText={onChange}
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            rules={{
              required: '비밀번호를 입력해주세요',
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <Textfield
                label="비밀번호"
                placeholder="영문, 숫자를 포함하여 입력해주세요."
                textContentType="password"
                secureTextEntry={isSecureTextEntry}
                maxLength={16}
                value={value}
                isError={formState.errors.password != null}
                errorMessage={formState.errors.password?.message}
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
        </StyledFieldContainer>
        <ButtonWrapper>
          <Button
            text="로그인하기"
            disabled={!formState.isValid}
            style={{borderRadius: 12}}
            onPress={() => {
              void handlePressSubmit();
            }}
          />
          <StyledHorizontalView>
            <StyledTextButton
              onPress={() => {
                navigation.push('FindId');
              }}>
              <Text
                text="아이디 찾기"
                type="body2"
                color="gray-600"
                fontWeight="500"
              />
            </StyledTextButton>
            <Text text="|" type="body2" color="gray-600" fontWeight="500" />
            <StyledTextButton
              onPress={() => {
                navigation.push('FindPassword');
              }}>
              <Text
                text="비밀번호 찾기"
                type="body2"
                color="gray-600"
                fontWeight="500"
              />
            </StyledTextButton>
          </StyledHorizontalView>
        </ButtonWrapper>
      </StyledSection>
    </SafeAreaView>
  );
};

const StyledTopBar = styled.View`
  display: flex;
  flex-direction: row;
  padding: 20px 16px;
  align-items: center;
  justify-content: space-between;
`;

const StyledBackButton = styled.TouchableOpacity`
  width: 32px;
`;

const StyledSection = styled.View`
  display: flex;
  flex-direction: column;
  flex: 1;
  background-color: white;
  padding: 32px 16px 0;
`;

const StyledFieldContainer = styled.View`
  gap: 20px;
  padding-top: 42px;
  padding-bottom: 32px;
`;

const ButtonWrapper = styled.View`
  width: 100%;
  padding: 4px;
`;

const StyledTextButton = styled.TouchableOpacity`
  margin-top: 16px;
  margin-bottom: 14px;
  padding: 6px;
`;

const StyledHorizontalView = styled.View`
  display: flex;
  flex-direction: row;
  gap: 8px;
  align-items: center;
  justify-content: center;
`;
