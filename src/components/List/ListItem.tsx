import React from 'react';

import styled from '@emotion/native';
import {View} from 'react-native';

import {Gap} from '../Gap';
import {Tag, Tags} from '../Tag';
import {Text} from '../Text';

export interface IMatchListItem {
  image?: string;
  title: string;
  level: string;
  matchingType: string;
  isFinish: boolean;
  currentMember: number;
  maximumMember: number;
  period: 1 | 2 | 3;
}

interface IListItemProps extends IMatchListItem {
  onPress: () => void;
}

export const ListItem = ({
  image,
  title,
  isFinish,
  currentMember,
  maximumMember,
  matchingType,
  period,
  level,
  onPress,
}: IListItemProps): React.JSX.Element => (
  <StyledListItem activeOpacity={0.8} onPress={onPress}>
    <StyledInfoView>
      <StyledProfile />
      <View>
        <Text text={title} type="body1" color="gray-700" fontWeight="600" />
        <Gap size="8px" />
        <Tag
          type={isFinish ? 'sm' : 'xs'}
          color={isFinish ? 'gray-0' : 'gray-600'}
          backgroundColor={isFinish ? 'gray-700' : 'gray-0'}
          text={
            isFinish
              ? `팀원 모집완료 ${currentMember}/${maximumMember}`
              : `팀원 모집 중 ${currentMember}/${maximumMember}`
          }
        />
        <Gap size="8px" />

        <Tags
          type="sm"
          color="gray-700"
          backgroundColor="gray-200"
          texts={[matchingType, `${period}주동안`, `운동레벨 ${level}`]}
        />
      </View>
    </StyledInfoView>
  </StyledListItem>
);

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
