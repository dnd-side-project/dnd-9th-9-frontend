import React from 'react';

import styled from '@emotion/native';

import {arrowRightXmlData} from '../../../../assets/svg';
import {Icon} from '../../../../components/Icon';
import {Text} from '../../../../components/Text';
import {type IMatchMember} from '../../types/member';

interface IMatchDetailMembersProps {
  currentSize: number;
  maxSize: number;
  members: IMatchMember[];
}

export const MatchDetailMembers = ({
  currentSize,
  maxSize,
  members,
}: IMatchDetailMembersProps): React.JSX.Element => {
  return (
    <StyledMatchDetailMembersWrapper>
      <StyledHeaderWrapper activeOpacity={0.8}>
        <Text
          type="body2"
          fontWeight="600"
          text={`현재 팀원 ${currentSize}/${maxSize}`}
        />
        <Icon svgXml={arrowRightXmlData} width={40} height={40} />
      </StyledHeaderWrapper>
      <StyledMemberWrapper>
        {members.map(member => (
          <StyledMember key={`member-${member.id}`} />
        ))}
      </StyledMemberWrapper>
    </StyledMatchDetailMembersWrapper>
  );
};

const StyledMatchDetailMembersWrapper = styled.View`
  padding: 20px 16px 50px 16px;
`;

const StyledHeaderWrapper = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const StyledMemberWrapper = styled.View`
  flex-direction: row;
  gap: 8px;
  margin-top: 22px;
`;

const StyledMember = styled.View`
  width: 44px;
  height: 44px;
  border-radius: 22px;
  background-color: ${props => props.theme.palette['gray-100']};
`;
