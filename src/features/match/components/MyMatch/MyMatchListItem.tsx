import React from 'react';

import styled from '@emotion/native';
import {useNavigation} from '@react-navigation/native';
import {type NativeStackNavigationProp} from '@react-navigation/native-stack';
import {View} from 'react-native';

import {Gap} from '../../../../components/Gap';
import {Tag, Tags} from '../../../../components/Tag';
import {Text} from '../../../../components/Text';
import {type MatchStackParamList} from '../../../../navigators';
import {Periods, SkillLevels} from '../../const';
import {type TFieldType, type TPeriod, type TSkillLevel} from '../../types';

interface IMyMatchListItemProps {
  fieldId: number;
  currentSize: number;
  fieldType: TFieldType;
  maxSize: number;
  name: string;
  period: TPeriod;
  skillLevel: TSkillLevel;
  isLeader?: boolean;
}

export const MyMatchListItem = ({
  fieldId,
  currentSize,
  fieldType,
  maxSize,
  name,
  period,
  skillLevel,
  isLeader = false,
}: IMyMatchListItemProps): React.JSX.Element => {
  const navigation =
    useNavigation<NativeStackNavigationProp<MatchStackParamList>>();

  const isFinish = currentSize === maxSize;

  const handleTeamDetail = (fieldId: number): void => {
    navigation.navigate('MatchDetail', {id: fieldId});
  };

  return (
    <StyledListItem
      activeOpacity={0.8}
      onPress={() => {
        handleTeamDetail(fieldId);
      }}>
      <StyledInfoView>
        <StyledProfile />
        <View>
          <Text text={name} type="body1" color="gray-700" fontWeight="600" />
          <Gap size="8px" />
          <View style={{flexDirection: 'row', gap: 8}}>
            {isFinish && (
              <Tag
                type="sm"
                color="gray-0"
                backgroundColor="gray-700"
                text="매칭 대기중"
                hasBorder={false}
                borderColor="main-400"
              />
            )}
            {fieldType !== 'DUEL' && (
              <Tag
                type="sm"
                color="gray-0"
                backgroundColor="gray-700"
                text={
                  isFinish
                    ? `팀원 모집완료 ${currentSize}/${maxSize}`
                    : `팀원 모집 중 ${currentSize}/${maxSize}`
                }
                hasBorder={false}
                borderColor={'main-400'}
              />
            )}

            {isLeader && (
              <Tag
                type="sm"
                color="gray-0"
                backgroundColor="main-300"
                text="방장"
                hasBorder={false}
                borderColor={'main-400'}
              />
            )}
          </View>
          <Gap size="8px" />

          <Tags
            type="sm"
            hasBorder={false}
            borderColor="gray-200"
            color="gray-700"
            backgroundColor="gray-200"
            texts={[
              `${Periods[period]}동안`,
              `운동레벨 ${SkillLevels[skillLevel]}`,
            ]}
          />
        </View>
      </StyledInfoView>
    </StyledListItem>
  );
};

const StyledListItem = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 19px 16px;
  background-color: ${props => props.theme.palette['gray-50']};
  border-radius: 12px;
  margin: 5px 16px;
`;

const StyledInfoView = styled.View`
  flex-direction: row;
  align-items: center;
`;

const StyledProfile = styled.View`
  height: 58px;
  width: 58px;
  border-radius: 29px;
  margin: 0 16px 0 0;
  background-color: ${props => props.theme.palette['gray-200']};
`;
