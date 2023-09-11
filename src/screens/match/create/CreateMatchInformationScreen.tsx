import React, {useState} from 'react';

import styled from '@emotion/native';
import {type NativeStackScreenProps} from '@react-navigation/native-stack';
import {SafeAreaView, ScrollView, View} from 'react-native';

import {Button} from '../../../components/Button';
import {Count} from '../../../components/Count';
import {Gap} from '../../../components/Gap';
import {Line} from '../../../components/Line';
import {Text} from '../../../components/Text';
import {CreateMatchInformationItem} from '../../../features/match/components/CreateMatchInformation';
import {
  FieldTypes,
  Goals,
  Periods,
  SkillLevels,
  Strengths,
} from '../../../features/match/const';
import {type ICreateField} from '../../../features/match/types';
import {type MatchStackParamList} from '../../../navigators';
import useStore from '../../../store/client/useStore';

type TCreateMatchInformationScreenProps = NativeStackScreenProps<
  MatchStackParamList,
  'TeamInformation'
>;

export const CreateMatchInformationScreen = ({
  navigation,
}: TCreateMatchInformationScreenProps): React.JSX.Element => {
  const {handleMatchPayload} = useStore();

  const [createMatchPayload, setCreateMatchPayload] = useState({
    fieldType: '',
    maxSize: 1,
    period: '',
    goal: '',
    skillLevel: '',
    strength: '',
  });

  const {fieldType, maxSize, period, goal, skillLevel, strength} =
    createMatchPayload;

  const isAbleMemberCountPayload =
    fieldType === 'DUEL' ? maxSize === 1 : maxSize >= 2 && maxSize <= 10;

  const isAblePayload =
    Object.keys(FieldTypes).some(value => value === fieldType) &&
    Object.keys(Periods).some(value => value === period) &&
    Object.keys(Goals).some(value => value === goal) &&
    Object.keys(SkillLevels).some(value => value === skillLevel) &&
    Object.keys(Strengths).some(value => value === strength) &&
    isAbleMemberCountPayload;

  const isPersonalMatching = fieldType === 'DUEL';
  const isMinimumOfMemberCount = maxSize <= 2;
  const isMaximumOfMemberCount = maxSize >= 10;

  const handleCreateMatchPayload = (
    key: keyof ICreateField,
    value: string | number,
  ): void => {
    setCreateMatchPayload(prev => {
      return {...prev, [key]: value};
    });
  };

  const handleMatchingPayload = (value: string | number): void => {
    handleCreateMatchPayload('fieldType', value);
    if (value === 'DUEL') {
      handleCreateMatchPayload('maxSize', 1);
    } else {
      handleCreateMatchPayload('maxSize', 2);
    }
  };

  const handleNextStep = (): void => {
    handleMatchPayload('fieldType', fieldType);
    handleMatchPayload('maxSize', maxSize);
    handleMatchPayload('period', period);
    handleMatchPayload('goal', goal);
    handleMatchPayload('skillLevel', skillLevel);
    handleMatchPayload('strength', strength);

    navigation.navigate('TeamProfile');
  };

  return (
    <SafeAreaView style={{backgroundColor: '#ffffff', flex: 1}}>
      <ScrollView>
        <CreateMatchInformationItem
          label="매칭"
          field="fieldType"
          pick={fieldType}
          handlePick={(value: string | number) => {
            handleMatchingPayload(value);
          }}
        />

        {Object.keys(FieldTypes).some(value => value === fieldType) && (
          <StyledInputView>
            <Text type="body1" text="팀 인원수" />
            <Gap size="30px" />
            <Count
              disabled={isPersonalMatching}
              minusDisabled={isPersonalMatching || isMinimumOfMemberCount}
              plusDisabled={isPersonalMatching || isMaximumOfMemberCount}
              count={maxSize}
              handlePlus={() => {
                handleCreateMatchPayload('maxSize', maxSize + 1);
              }}
              handleMinus={() => {
                handleCreateMatchPayload('maxSize', maxSize - 1);
              }}
            />
            <Gap size="31px" />
            <Line size="sm" />
          </StyledInputView>
        )}

        <CreateMatchInformationItem
          label="진행기간"
          field="period"
          pick={period}
          handlePick={(value: string | number) => {
            handleCreateMatchPayload('period', value);
          }}
        />
        <CreateMatchInformationItem
          label="카테고리"
          field="goal"
          pick={goal}
          handlePick={(value: string | number) => {
            handleCreateMatchPayload('goal', value);
          }}
        />

        <CreateMatchInformationItem
          label="운동레벨"
          field="skillLevel"
          pick={skillLevel}
          handlePick={(value: string | number) => {
            handleCreateMatchPayload('skillLevel', value);
          }}
        />

        <CreateMatchInformationItem
          label="운동강도"
          field="strength"
          pick={strength}
          handlePick={(value: string | number) => {
            handleCreateMatchPayload('strength', value);
          }}
        />
        <Gap size="100px" />
      </ScrollView>

      <View style={{position: 'absolute', bottom: 0, width: '100%'}}>
        <Button
          disabled={!isAblePayload}
          text="다음"
          onPress={handleNextStep}
        />
      </View>
    </SafeAreaView>
  );
};

const StyledInputView = styled.View`
  padding: 23px 18px 0 18px;
`;
