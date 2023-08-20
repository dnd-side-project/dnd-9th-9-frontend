import React from 'react';

import styled from '@emotion/native';
import {TouchableOpacity, View} from 'react-native';

import {CheckBox} from '../../../../components/CheckBox';
import {Gap} from '../../../../components/Gap';
import {Tags} from '../../../../components/Tag';
import {Text} from '../../../../components/Text';
import {FieldTypes, Periods, SkillLevels} from '../../const';
import {type IMatchApply} from '../../types';

interface IMatchApplyListItemProps {
  isSettingMode?: boolean;
  checked?: boolean;
  apply: IMatchApply;
  handleCheck?: () => void;
}

interface IStyledMatchApplyListItem {
  isSettingMode: boolean;
  checked: boolean;
}

export const MatchApplyListItem = ({
  isSettingMode = false,
  checked = false,
  apply,
  handleCheck,
}: IMatchApplyListItemProps): React.JSX.Element => {
  const {
    entryId,
    name,
    memberCount,
    memberMaxCount,
    fieldType,
    period,
    skillLevel,
  } = apply;

  return (
    <StyledMatchApplyListItem
      key={entryId}
      isSettingMode={isSettingMode}
      checked={checked}>
      {isSettingMode && (
        <TouchableOpacity activeOpacity={0.8} onPress={handleCheck}>
          <CheckBox checked={checked} />
        </TouchableOpacity>
      )}

      <View>
        <Text type="body1" color="gray-700" fontWeight="600" text={name} />
        <Gap size="12px" />
        <Text
          type="body3"
          color="gray-700"
          fontWeight="700"
          text={`팀원 모집 완료 ${memberCount.toString()}/${memberMaxCount.toString()}`}
        />
        <Gap size="10px" />
        <Tags
          type="sm"
          color="gray-700"
          backgroundColor="gray-200"
          fontWeight="400"
          texts={[
            FieldTypes[fieldType],
            `${Periods[period]}동안`,
            `운동레벨 ${SkillLevels[skillLevel]}`,
          ]}
        />
      </View>
    </StyledMatchApplyListItem>
  );
};

const StyledMatchApplyListItem = styled.View<IStyledMatchApplyListItem>`
  flex-direction: row;
  gap: 10px;
  border-top-width: 1px;
  border-top-color: ${props => props.theme.palette['gray-50']};
  background: ${props => props.checked && props.theme.palette['gray-50']};
  align-items: center;
  padding: ${props => (props.isSettingMode ? '17px 6px' : '17px 16px')};
`;
