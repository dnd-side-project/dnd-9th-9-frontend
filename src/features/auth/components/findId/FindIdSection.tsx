/* eslint-disable @typescript-eslint/no-misused-promises */
import React, {useState} from 'react';

import styled from '@emotion/native';
import {ScrollView} from 'react-native';

import {BottomSheet} from '../../../../components/BottomSheet';
import {Button} from '../../../../components/Button';
import {Text} from '../../../../components/Text';
import {Textfield} from '../../../../components/Textfield/Textfield';
import {type IFormSectionProps} from '../../../../screens/auth/FindIdScreen';
import {useGetFindId} from '../../hooks/auth/useGetFindId';

export const FindIdSection = ({
  getValues,
}: IFormSectionProps): React.JSX.Element => {
  const [isBottomSheetOpened, setIsBottomSheetOpened] = useState(false);

  const handlePressNext = async (): Promise<void> => {
    setIsBottomSheetOpened(true);
  };

  const {
    isSuccess,
    isError,
    data: uids,
    error,
  } = useGetFindId({
    name: getValues('name'),
    phoneNum: getValues('mobilePhone'),
  });

  return (
    <>
      <ScrollView>
        <StyledSection>
          <StyledFieldContainer>
            <Text
              text="아이디 찾기"
              type="head3"
              fontWeight="600"
              style={{paddingTop: 32, paddingBottom: 42}}
            />
            {uids != null && uids.length > 0 ? (
              uids.map(id => {
                return (
                  <Textfield
                    key={id}
                    textContentType="nickname"
                    isError={isError}
                    value={id}
                    isValid={isSuccess}
                    errorMessage={error?.message}
                    hintMessage="고객님의 정보와 일치하는 아이디입니다."
                  />
                );
              })
            ) : (
              <Text
                style={{
                  paddingTop: 150,
                  width: '100%',
                  textAlign: 'center',
                }}
                text="일치하는 아이디가 없어요"
                color="gray-400"
                fontWeight="600"
              />
            )}
          </StyledFieldContainer>
        </StyledSection>
      </ScrollView>

      <FixedButtonWrapper>
        <Button text="다음" onPress={handlePressNext} />
      </FixedButtonWrapper>

      <BottomSheet
        isOpened={isBottomSheetOpened}
        style={undefined}
        onClose={() => {
          setIsBottomSheetOpened(false);
        }}>
        <BottomSheet.Content>
          <StyleButtonContainer>
            <StyledTextButton>
              {/* TODO(@minimalKim): 비밀번호 찾기 스크린 추가 */}
              <Text text="비밀번호 찾기" fontWeight="700" type="body2" />
            </StyledTextButton>
            <StyledHorizontalLine />
            {/* TODO*(@minimalKim): 로그인 스크린 추가 (디자인 명세 필요) */}
            <StyledTextButton>
              <Text text="로그인하기" fontWeight="700" type="body2" />
            </StyledTextButton>
          </StyleButtonContainer>
        </BottomSheet.Content>
      </BottomSheet>
    </>
  );
};

const StyledSection = styled.View`
  flex-direction: column;
  flex: 1;
  justify-content: space-between;
  padding-bottom: 60px;
`;

const StyledFieldContainer = styled.View`
  padding: 0 16px;
`;

const FixedButtonWrapper = styled.View`
  width: 100%;
`;

const StyleButtonContainer = styled.View`
  display: flex;
  gap: 10px;
`;

const StyledHorizontalLine = styled.View`
  height: 2px;
  width: 100%;
  background-color: ${({theme}) => theme.palette['gray-200']};
`;

const StyledTextButton = styled.TouchableOpacity`
  padding-top: 20px;
  padding-bottom: 20px;
`;
