import React from 'react';

import styled from '@emotion/native';
import {TouchableOpacity} from 'react-native';

import {CheckBox} from '../../../../components/CheckBox';
import {Gap} from '../../../../components/Gap';
import {Tags} from '../../../../components/Tag';
import {Text} from '../../../../components/Text';
import {FieldTypes, Periods, SkillLevels} from '../../const';
import {type IBattleEntry} from '../../types';

interface IMatchApplyListItemProps {
  isSettingMode?: boolean;
  isCheck?: boolean;
  apply: IBattleEntry;
  onPressCheckBox?: (entryId: number) => void;
  onPressTeamDetail: (matchId: number) => void;
}

interface IStyledMatchApplyListItem {
  isSettingMode: boolean;
  isCheck: boolean;
}

export const MatchApplyListItem = ({
  isSettingMode = false,
  isCheck = false,
  apply,
  onPressCheckBox = () => {},
  onPressTeamDetail,
}: IMatchApplyListItemProps): React.JSX.Element => {
  const {
    currentSize,
    entryId,
    fieldId,
    fieldType,
    maxSize,
    name,
    period,
    skillLevel,
  } = apply;

  return (
    <StyledMatchApplyListItem
      key={entryId}
      isSettingMode={isSettingMode}
      isCheck={isCheck}>
      {isSettingMode && (
        <CheckBox
          isCheck={isCheck}
          onPress={() => {
            onPressCheckBox(entryId);
          }}
        />
      )}

      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          if (!isSettingMode) onPressTeamDetail(fieldId);
        }}>
        <Text type="body1" color="gray-700" fontWeight="600" text={name} />
        <Gap size="12px" />
        <Text
          type="body3"
          color="gray-700"
          fontWeight="700"
          text={`팀원 모집 완료 ${currentSize.toString()}/${maxSize.toString()}`}
        />
        <Gap size="10px" />
        <Tags
          hasBorder={false}
          borderColor="gray-0"
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
      </TouchableOpacity>
    </StyledMatchApplyListItem>
  );
};

const StyledMatchApplyListItem = styled.View<IStyledMatchApplyListItem>`
  flex-direction: row;
  gap: 10px;
  border-top-width: 1px;
  border-top-color: ${props => props.theme.palette['gray-50']};
  background: ${props => props.isCheck && props.theme.palette['gray-50']};
  align-items: center;
  padding: ${props => (props.isSettingMode ? '17px 6px' : '17px 16px')};
`;
