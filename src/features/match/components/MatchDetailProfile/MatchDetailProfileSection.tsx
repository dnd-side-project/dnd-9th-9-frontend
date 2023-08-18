import React from 'react';

import styled from '@emotion/native';
import {TouchableOpacity, View} from 'react-native';

import {Gap} from '../../../../components/Gap';
import {Line} from '../../../../components/Line';
import {Tag, Tags} from '../../../../components/Tag';
import {Text} from '../../../../components/Text';
import {FieldTypes, Goals, Periods, SkillLevels, Strengths} from '../../const';
import {type IMatchDetail} from '../../types/detail';

interface IMatchDetailProfileSectionProps {
  detailInfo: IMatchDetail;
  isMember: boolean;
}

interface IStausTagProps {
  text: string;
}

const StatusTag = ({text}: IStausTagProps): React.JSX.Element => {
  return (
    <Tag type="sm" color="gray-0" backgroundColor="main-300" text={text} />
  );
};

export const MatchDetailProfileSection = ({
  detailInfo,
  isMember,
}: IMatchDetailProfileSectionProps): React.JSX.Element => {
  const {
    // profileImg,
    name,
    description,
    rule,
    fieldType,
    goal,
    period,
    skillLevel,
    strength,
  } = detailInfo;

  const filedTypeLabel = FieldTypes[fieldType];
  const periodLabel = `${Periods[period]}동안`;
  const goalLabel = Goals[goal];
  const skillLevelLabel = `운동 레벨 ${SkillLevels[skillLevel]}`;
  const strengthLabel = `운동 강도 ${Strengths[strength]}`;

  return (
    <StyledMatchDetailProfileSectionWrapper>
      <StyledProfileWrapper>
        <StyledProfileInformation>
          <StyledProfile />
          <View>
            <StatusTag text="팀 매칭" />
            <Gap size="6px" />
            <StatusTag text="팀원 모집 중" />
          </View>
        </StyledProfileInformation>

        {isMember && (
          <TouchableOpacity activeOpacity={0.8}>
            <Text type="body2" color="gray-600" fontWeight="400" text="설정" />
          </TouchableOpacity>
        )}
      </StyledProfileWrapper>

      <Text type="head4" fontWeight="600" text={name} />
      <Gap size="8px" />
      <Text type="body3" color="gray-600" fontWeight="400" text={description} />

      <StyledSubTitleWrapper>
        <Text type="body2" fontWeight="600" text="팀 규칙" />
      </StyledSubTitleWrapper>
      <Text type="body2" fontWeight="400" text={rule} />
      <Gap size="10px" />

      <Line size="sm" />

      <StyledSubTitleWrapper>
        <Text type="body2" fontWeight="600" text="팀 정보" />
      </StyledSubTitleWrapper>

      <Tags
        type="sm"
        color="gray-700"
        backgroundColor="gray-50"
        fontWeight="400"
        texts={[filedTypeLabel, periodLabel, goalLabel]}
      />
      <Gap size="8px" />
      <Tags
        type="sm"
        color="gray-700"
        backgroundColor="gray-50"
        fontWeight="400"
        texts={[skillLevelLabel, strengthLabel]}
      />
    </StyledMatchDetailProfileSectionWrapper>
  );
};

const StyledMatchDetailProfileSectionWrapper = styled.View`
  padding: 30px 16px 33px 16px;
`;

const StyledProfileWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  text-align: center;
  align-items: center;
  margin-bottom: 20px;
`;

const StyledProfileInformation = styled.View`
  flex-direction: row;
  text-align: center;
  align-items: center;
  gap: 10px;
`;

const StyledProfile = styled.View`
  width: 58px;
  height: 58px;
  border-radius: 107.692px;
  background-color: ${props => props.theme.palette['gray-100']};
`;

const StyledSubTitleWrapper = styled.View`
  margin: 28px 0 18px 0;
`;
