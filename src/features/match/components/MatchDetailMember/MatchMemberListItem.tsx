import React from 'react';

import styled from '@emotion/native';

import {CheckBox} from '../../../../components/CheckBox';
import {Tag} from '../../../../components/Tag';
import {Text} from '../../../../components/Text';
import {SkillLevels} from '../../const';
import {type IUserField} from '../../types';
import {type ITeamEntry} from '../../types/fieldEntry';

interface IMatchMemberListItemProps {
  isSettingMode?: boolean;
  isCheck?: boolean;
  memberInfo: IUserField | ITeamEntry;
  onPressCheckBox?: () => void;
}

export const MatchMemberListItem = ({
  isSettingMode = false,
  isCheck = false,
  memberInfo,
  onPressCheckBox,
}: IMatchMemberListItemProps): React.JSX.Element => {
  return (
    <StyledMatchApplyListItem isSettingMode={isSettingMode} isCheck={isCheck}>
      {isSettingMode && (
        <CheckBox isCheck={isCheck} onPress={onPressCheckBox} />
      )}

      <StyledProfile />

      <Text
        type="body1"
        color="black"
        fontWeight="700"
        text={memberInfo.name}
      />
      {Boolean(memberInfo?.isLeader) && (
        <Tag
          type="sm"
          hasBorder
          backgroundColor="main-300"
          borderColor="main-300"
          color="gray-0"
          text="방장"
        />
      )}
      <Tag
        type="sm"
        hasBorder
        backgroundColor="gray-200"
        borderColor="gray-200"
        color="gray-700"
        text={`운동레벨 ${SkillLevels[memberInfo.skillLevel]}`}
      />
    </StyledMatchApplyListItem>
  );
};

const StyledProfile = styled.View`
  width: 44px;
  height: 44px;
  border-radius: 50px;
  background-color: ${props => props.theme.palette['gray-200']};
`;

const StyledMatchApplyListItem = styled.View<{
  isSettingMode: boolean;
  isCheck: boolean;
}>`
  flex-direction: row;
  align-items: center;
  gap: 10px;
  padding: 12px ${props => (props.isSettingMode ? '0px' : '16px')};
  background: ${props => props.isCheck && props.theme.palette['gray-50']};
`;
