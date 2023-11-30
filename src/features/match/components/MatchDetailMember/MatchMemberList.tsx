import React, {useMemo, useState} from 'react';

import styled from '@emotion/native';
import {TouchableOpacity, View} from 'react-native';

import {MatchExitButton} from './MatchExitButton';
import {MatchMemberListItem} from './MatchMemberListItem';
import {MatchMemberSettingBottomSheet} from './MatchMemberSettingBottomSheet';
import {arrowRightXmlData, threeDotXmlData} from '../../../../assets/svg';
import {Gap} from '../../../../components/Gap';
import {Icon} from '../../../../components/Icon';
import {Text} from '../../../../components/Text';
import {useGetFieldDetail} from '../../hooks/field';
import {type IUserField, type ITeamEntry, type TUserRole} from '../../types';

interface IMatchMemberListProps {
  id: number;
  userRole: TUserRole;
  type: 'MEMBER' | 'DELETE' | 'ASSIGN' | 'REQUEST';
  members?: IUserField[] | ITeamEntry[];
  checkedMember?: number[];
  isSettingMode?: boolean;
  isSummary?: boolean;
  onPressMore?: () => void;
  onPressCheckMember?: (id: number) => void;
}

export const MatchMemberList = ({
  id,
  userRole,
  type,
  members = [],
  checkedMember = [],
  isSettingMode = false,
  isSummary = false,
  onPressMore,
  onPressCheckMember = () => {},
}: IMatchMemberListProps): React.JSX.Element => {
  const [isOpenSettingSelect, setIsOpenSettingSelect] = useState(false);

  const {data: fieldDetailData} = useGetFieldDetail({
    id,
  });

  const infoByType = {
    MEMBER: '현재 팀원',
    DELETE: '팀원 삭제',
    ASSIGN: '방장 넘기기',
    REQUEST: '요청',
  } as const;

  const handleSettingList = (): void => {};

  const memberData = useMemo(() => {
    if (type === 'REQUEST') {
      return isSummary
        ? (members.slice(0, 3) as ITeamEntry[])
        : (members as ITeamEntry[]);
    }
    return members as IUserField[];
  }, [type, isSummary, members]);

  return (
    <View style={{flex: 1}}>
      <StyledHeaderWrapper>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
          }}>
          <Text type="head4" fontWeight="600" text={infoByType[type]} />
          {type === 'MEMBER' && (
            <Text
              type="body2"
              color="gray-600"
              fontWeight="400"
              text={`${fieldDetailData?.fieldDto?.currentSize ?? '-'}/${
                fieldDetailData?.fieldDto?.maxSize ?? '-'
              }`}
            />
          )}
        </View>

        {!isSettingMode && userRole === 'LEADER' && (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={isSummary ? onPressMore : handleSettingList}>
            {isSummary ? (
              <Icon
                svgXml={arrowRightXmlData}
                width={44}
                height={44}
                color="black"
              />
            ) : (
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  setIsOpenSettingSelect(true);
                }}>
                <Icon svgXml={threeDotXmlData} width={20} height={20} />
              </TouchableOpacity>
            )}
          </TouchableOpacity>
        )}
      </StyledHeaderWrapper>

      {memberData.length > 0 ? (
        memberData.map((memberInfo, idx) => (
          <MatchMemberListItem
            key={`${type}-member-${idx}`}
            isSettingMode={isSettingMode}
            memberInfo={memberInfo}
            isCheck={checkedMember.includes(
              type === 'REQUEST'
                ? (memberInfo as ITeamEntry)?.entryId
                : (memberInfo as IUserField)?.id,
            )}
            onPressCheckBox={() => {
              onPressCheckMember(
                type === 'REQUEST'
                  ? (memberInfo as ITeamEntry)?.entryId
                  : (memberInfo as IUserField)?.id,
              );
            }}
          />
        ))
      ) : (
        <StyledNoContentsWrapper>
          <Text
            type="body2"
            color="gray-400"
            fontWeight="600"
            text="팀원이 존재하지 않습니다."
          />
        </StyledNoContentsWrapper>
      )}

      {!isSummary && type === 'MEMBER' && userRole !== 'GUEST' && (
        <MatchExitButton id={id} />
      )}

      {isSummary && type === 'REQUEST' && (
        <StyledButton onPress={onPressMore}>
          <Text type="body2" color="gray-600" fontWeight="400" text="더보기" />
        </StyledButton>
      )}

      <Gap size="20px" />

      <MatchMemberSettingBottomSheet
        id={id}
        userRole={userRole}
        type={type}
        isOpened={isOpenSettingSelect}
        onOpen={() => {
          setIsOpenSettingSelect(true);
        }}
        onClose={() => {
          setIsOpenSettingSelect(false);
        }}
      />
    </View>
  );
};

const StyledHeaderWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 32px 20px 20px 16px;
`;

const StyledNoContentsWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  min-height: 120px;
  margin: 0px auto 30px auto;
`;

const StyledButton = styled.TouchableOpacity`
  align-items: center;
  margin: auto;
  color: ${props => props.theme.palette['gray-600']};
  background-color: ${props => props.theme.palette['gray-50']};
  margin: 10px 17px 30px 17px;
  padding: 27px 0px;
`;
