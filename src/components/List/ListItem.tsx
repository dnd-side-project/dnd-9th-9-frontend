import React from 'react';

import styled from '@emotion/native';
import {useNavigation} from '@react-navigation/native';
import {type NativeStackNavigationProp} from '@react-navigation/native-stack';
import {View} from 'react-native';

import {FieldTypes, Periods, SkillLevels} from '../../features/match/const';
import {type IField} from '../../features/match/types';
import {type MatchStackParamList} from '../../navigators';
import {Gap} from '../Gap';
import {Tag, Tags} from '../Tag';
import {Text} from '../Text';

interface IListItemProps extends IField {}

export const ListItem = ({
  currentSize,
  fieldType,
  goal,
  id,
  maxSize,
  name,
  period,
  profileImg,
  skillLevel,
}: IListItemProps): React.JSX.Element => {
  const isFinish = maxSize === currentSize;

  const navigation =
    useNavigation<NativeStackNavigationProp<MatchStackParamList>>();

  const handleTeamDetail = (id: number): void => {
    navigation.navigate('MatchDetail', {id});
  };

  return (
    <StyledListItem
      activeOpacity={0.8}
      onPress={() => {
        handleTeamDetail(id);
      }}>
      <StyledInfoView>
        <StyledProfile />
        <View>
          <Text text={name} type="body1" color="gray-700" fontWeight="600" />
          <Gap size="8px" />
          <View style={{flexDirection: 'row', gap: 8}}>
            <Tag
              type={isFinish ? 'sm' : 'xs'}
              color={isFinish ? 'gray-0' : 'gray-600'}
              backgroundColor={isFinish ? 'gray-700' : 'gray-0'}
              text={
                isFinish
                  ? `팀원 모집완료 ${currentSize}/${maxSize}`
                  : `팀원 모집 중 ${currentSize}/${maxSize}`
              }
              hasBorder={false}
              borderColor={'main-400'}
            />
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
          </View>
          <Gap size="8px" />

          <Tags
            type="sm"
            hasBorder={false}
            borderColor="gray-200"
            color="gray-700"
            backgroundColor="gray-200"
            texts={[
              FieldTypes[fieldType],
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
  background-color: ${props => props.theme.palette['gray-0']};
  border: 1px solid ${props => props.theme.palette['gray-50']};
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
  background-color: ${props => props.theme.palette['gray-600']};
`;
