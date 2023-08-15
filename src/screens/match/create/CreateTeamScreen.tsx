import React from 'react';

import styled from '@emotion/native';
import {type NativeStackScreenProps} from '@react-navigation/native-stack';
import {SafeAreaView, View} from 'react-native';

import {Button} from '../../../components/Button';
import {Text} from '../../../components/Text';
import {type MatchStackParamList} from '../../../navigators';

type TCreateMatchScreenProps = NativeStackScreenProps<
  MatchStackParamList,
  'TeamInformation'
>;

export const CreateTeamScreen = ({
  navigation,
}: TCreateMatchScreenProps): React.JSX.Element => {
  const matchingRadio = ['1vs1', '팀vs팀', '매칭안함'];
  const periodRadio = ['1주', '2주', '3주'];
  const categoryRadio = ['카테고리', '체중증량', '유지어터', '바디프로필'];
  const levelRadio = ['초보', '보통', '보통이상', '고수'];
  const strengthRadio = ['약하게', '보통', '강하게'];

  return (
    <SafeAreaView style={{backgroundColor: '#ffffff', flex: 1}}>
      <View style={{backgroundColor: '#ffffff', flex: 1}}>
        <StyledInputView>
          <Text type="body1" text="매칭" />
          <StyledTagWrapper>
            {matchingRadio.map((value, idx) => (
              <StyledSelect key={`matching-${idx}`}>
                <Text
                  type="body2"
                  fontWeight="400"
                  color="gray-600"
                  text={value}
                />
              </StyledSelect>
            ))}
          </StyledTagWrapper>
          <StyledLine />
        </StyledInputView>
        <StyledInputView>
          <Text type="body1" text="진행기간" />
          <StyledTagWrapper>
            {periodRadio.map((value, idx) => (
              <StyledSelect key={`period-${idx}`}>
                <Text
                  type="body2"
                  fontWeight="400"
                  color="gray-600"
                  text={value}
                />
              </StyledSelect>
            ))}
          </StyledTagWrapper>
          <StyledLine />
        </StyledInputView>
        <StyledInputView>
          <Text type="body1" text="카테고리" />
          <StyledTagWrapper>
            {categoryRadio.map((value, idx) => (
              <StyledSelect key={`category-${idx}`}>
                <Text
                  type="body2"
                  fontWeight="400"
                  color="gray-600"
                  text={value}
                />
              </StyledSelect>
            ))}
          </StyledTagWrapper>
          <StyledLine />
        </StyledInputView>
        <StyledInputView>
          <Text type="body1" text="운동레벨" />
          <StyledTagWrapper>
            {levelRadio.map((value, idx) => (
              <StyledSelect key={`level-${idx}`}>
                <Text
                  type="body2"
                  fontWeight="400"
                  color="gray-600"
                  text={value}
                />
              </StyledSelect>
            ))}
          </StyledTagWrapper>
          <StyledLine />
        </StyledInputView>
        <StyledInputView>
          <Text type="body1" text="운동강도" />
          <StyledTagWrapper>
            {strengthRadio.map((value, idx) => (
              <StyledSelect key={`strength-${idx}`}>
                <Text
                  type="body2"
                  fontWeight="400"
                  color="gray-600"
                  text={value}
                />
              </StyledSelect>
            ))}
          </StyledTagWrapper>
        </StyledInputView>

        <View style={{position: 'absolute', bottom: 0, width: '100%'}}>
          <Button
            text="다음"
            onPress={() => {
              navigation.navigate('TeamProfile');
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const StyledLine = styled.View`
  border-bottom-color: ${props => props.theme.palette['gray-100']};
  border-bottom-width: 1px;
  margin: 23px 0 0 0;
`;

const StyledInputView = styled.View`
  padding: 23px 18px 0 18px;
`;

const StyledTagWrapper = styled.View`
  flex-direction: row;
  margin: 20px 0 0 0;
  gap: 10px;
  width: auto; /* 특정 넓이 설정 */
  flex-direction: row; /* 수평으로 컴포넌트 배치 */
  flex-wrap: wrap; /* 컴포넌트가 넓이를 넘어갈 때 다음 줄로 넘어가도록 설정 */
`;

const StyledSelect = styled.View`
  padding: 6px 18px;
  border-radius: 100px;
  border: 1px solid ${props => props.theme.palette['gray-400']};
`;
