import React from 'react';

import styled from '@emotion/native';
import {useNavigation} from '@react-navigation/native';
import {type NativeStackNavigationProp} from '@react-navigation/native-stack';

import {Text} from '../../../../components/Text';
import {type MatchStackParamList} from '../../../../navigators';
import {FieldTypes} from '../../const';
import {type TFieldType, type IFieldListPaginationParams} from '../../types';

interface IMatchFieldTypeFilterRadioProps extends IFieldListPaginationParams {}

export const MatchFieldTypeFilterRadio = ({
  page,
  size,
  fieldType,
  goal,
  memberCount,
  period,
  skillLevel,
  strength,
  keyword,
}: IMatchFieldTypeFilterRadioProps): React.JSX.Element => {
  const navigation =
    useNavigation<NativeStackNavigationProp<MatchStackParamList>>();

  const fieldTypeKeys: TFieldType[] = ['DUEL', 'TEAM', 'TEAM_BATTLE'];

  return (
    <StyledFieldTypeWrapper>
      {fieldTypeKeys.map(value => (
        <StyledFieldTypeItem
          key={value}
          isSelect={fieldType === value}
          activeOpacity={0.8}
          onPress={() => {
            navigation.navigate('MatchList', {
              page,
              size,
              fieldType: value,
              goal,
              memberCount: null,
              period,
              skillLevel,
              strength,
              keyword,
            });
          }}>
          <Text
            type="body2"
            color={fieldType === value ? 'gray-0' : 'gray-600'}
            fontWeight={fieldType === value ? '700' : '400'}
            text={FieldTypes[value]}
          />
        </StyledFieldTypeItem>
      ))}
    </StyledFieldTypeWrapper>
  );
};

const StyledFieldTypeWrapper = styled.View`
  flex-direction: row;
  gap: 10px;
  margin: 16px;
`;

const StyledFieldTypeItem = styled.TouchableOpacity<{isSelect: boolean}>`
  border-radius: 100px;
  padding: 6px 18px;
  background-color: ${props =>
    props.isSelect
      ? props.theme.palette['main-300']
      : props.theme.palette['gray-0']};
  border-color: ${props =>
    props.isSelect
      ? props.theme.palette['main-300']
      : props.theme.palette['gray-400']};
  border-width: 2px;
`;
