import React, {useState} from 'react';

import styled from '@emotion/native';
import {useRoute, type RouteProp} from '@react-navigation/native';
import {SafeAreaView, ScrollView, View} from 'react-native';
import Toast from 'react-native-simple-toast';

import {Button} from '../../../../components/Button';
import {Count} from '../../../../components/Count';
import {Gap} from '../../../../components/Gap';
import {Line} from '../../../../components/Line';
import {ConfirmModal} from '../../../../components/Modal';
import {Text} from '../../../../components/Text';
import {CreateMatchInformationItem} from '../../../../features/match/components/CreateMatchInformation';
import {
  FieldTypes,
  Goals,
  Periods,
  SkillLevels,
  Strengths,
} from '../../../../features/match/const';
import {usePatchFieldInformation} from '../../../../features/match/hooks/field/usePatchFieldInformation';
import {type ICreateField} from '../../../../features/match/types';
import {type MatchStackParamList} from '../../../../navigators';

type TUpdateTeamInformationRouteProps = RouteProp<
  MatchStackParamList,
  'UpdateInformation'
>;

export const UpdateTeamInformationScreen = (): React.JSX.Element => {
  const route = useRoute<TUpdateTeamInformationRouteProps>();

  const {mutate: patchFieldInformation} = usePatchFieldInformation({
    onSuccessCallback: () => {
      Toast.show('팀 정보를 수정하였습니다.', Toast.SHORT, {
        backgroundColor: '#000000c5',
      });
    },
    onErrorCallback: error => {
      setModalInfo({
        isVisible: true,
        title: '오류가 발생하였습니다',
        subTitle:
          error?.response?.data?.message ?? '알 수 없는 오류가 발생하였습니다.',
      });
    },
  });

  const [updateMatchPayload, setUpdateMatchPayload] = useState({
    fieldType: route?.params?.fieldType,
    maxSize: route?.params?.maxSize,
    period: route?.params?.period,
    goal: route?.params?.goal,
    skillLevel: route?.params?.skillLevel,
    strength: route?.params?.strength,
  });

  const [modalInfo, setModalInfo] = useState({
    isVisible: false,
    title: '',
    subTitle: '',
  });

  const {fieldType, maxSize, period, goal, skillLevel, strength} =
    updateMatchPayload;

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

  const handleUpdateMatchPayload = (
    key: keyof ICreateField,
    value: string | number,
  ): void => {
    setUpdateMatchPayload(prev => {
      return {...prev, [key]: value};
    });
  };

  const handleMatchingTypePayload = (value: string | number): void => {
    if (value === 'DUEL') {
      handleUpdateMatchPayload('maxSize', 1);
      if (updateMatchPayload.fieldType !== 'DUEL') {
        setModalInfo({
          isVisible: true,
          title: '주의',
          subTitle: `1vs1 매칭으로 변경할 경우\n기존 팀원들은 삭제 됩니다.`,
        });
      }
    } else {
      handleUpdateMatchPayload('maxSize', 2);
    }
    handleUpdateMatchPayload('fieldType', value);
  };

  const handleUpdateConfirm = (): void => {
    const body = {
      fieldType,
      maxSize,
      period,
      goal,
      skillLevel,
      strength,
    };
    patchFieldInformation({
      id: route?.params?.id,
      body,
    });
  };

  return (
    <SafeAreaView style={{backgroundColor: '#ffffff', flex: 1}}>
      <ScrollView>
        <CreateMatchInformationItem
          label="매칭"
          field="fieldType"
          pick={fieldType}
          handlePick={(value: string | number) => {
            handleMatchingTypePayload(value);
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
                handleUpdateMatchPayload('maxSize', maxSize + 1);
              }}
              handleMinus={() => {
                handleUpdateMatchPayload('maxSize', maxSize - 1);
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
            handleUpdateMatchPayload('period', value);
          }}
        />
        <CreateMatchInformationItem
          label="카테고리"
          field="goal"
          pick={goal}
          handlePick={(value: string | number) => {
            handleUpdateMatchPayload('goal', value);
          }}
        />

        <CreateMatchInformationItem
          label="운동레벨"
          field="skillLevel"
          pick={skillLevel}
          handlePick={(value: string | number) => {
            handleUpdateMatchPayload('skillLevel', value);
          }}
        />

        <CreateMatchInformationItem
          label="운동강도"
          field="strength"
          pick={strength}
          handlePick={(value: string | number) => {
            handleUpdateMatchPayload('strength', value);
          }}
        />
        <Gap size="100px" />
      </ScrollView>

      <View style={{position: 'absolute', bottom: 0, width: '100%'}}>
        <Button
          disabled={!isAblePayload}
          text="완료"
          onPress={handleUpdateConfirm}
        />
      </View>

      <ConfirmModal
        visible={modalInfo.isVisible}
        title={modalInfo.title}
        subTitle={modalInfo.subTitle}
        handleConfirm={() => {
          setModalInfo({isVisible: false, title: '', subTitle: ''});
        }}
      />
    </SafeAreaView>
  );
};

const StyledInputView = styled.View`
  padding: 23px 18px 0 18px;
`;
