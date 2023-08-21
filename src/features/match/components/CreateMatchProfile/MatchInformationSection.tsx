import React from 'react';

import styled from '@emotion/native';
import {TouchableOpacity} from 'react-native';

import {Gap} from '../../../../components/Gap';
import {Line} from '../../../../components/Line';
import {Text} from '../../../../components/Text';
import useStore from '../../../../store/client/useStore';

interface IMatchInformationSectionProps {
  handleUpdateMatchInformation: () => void;
}

interface IMatchInformationItemProps {
  label: string;
  value: string;
}

const MatchInformationItem = ({
  label,
  value,
}: IMatchInformationItemProps): React.JSX.Element => {
  return (
    <StyledInformationItemWrapper>
      <Text type="caption" color="gray-600" fontWeight="400" text={label} />
      <Gap size="15px" />
      <Text type="body2" color="gray-950" fontWeight="400" text={value} />
      <Gap size="13px" />
      <Line size="sm" />
    </StyledInformationItemWrapper>
  );
};

export const MatchInformationSection = ({
  handleUpdateMatchInformation,
}: IMatchInformationSectionProps): React.JSX.Element => {
  const {matchPayload} = useStore();

  const {fieldType, maxSize, period, goal, skillLevel, strength} = matchPayload;

  return (
    <StyledMatchInformationSectionWrapper>
      <StyledHeaderWrapper>
        <Text type="body1" color="gray-950" fontWeight="600" text="팀 정보" />
        <TouchableOpacity
          onPress={handleUpdateMatchInformation}
          style={{marginRight: '1%'}}>
          <Text type="body2" color="gray-950" fontWeight="400" text="수정" />
        </TouchableOpacity>
      </StyledHeaderWrapper>

      <Gap size="20px" />

      <MatchInformationItem label="매칭 유형" value={fieldType} />
      <MatchInformationItem label="팀 인원" value={maxSize.toString()} />
      <MatchInformationItem label="진행기간" value={period} />
      <MatchInformationItem label="카테고리" value={goal} />
      <MatchInformationItem label="운동 레벨" value={skillLevel} />
      <MatchInformationItem label="운동 강도" value={strength} />
    </StyledMatchInformationSectionWrapper>
  );
};

const StyledMatchInformationSectionWrapper = styled.View`
  padding: 46px 16px 20% 16px;
`;

const StyledHeaderWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const StyledInformationItemWrapper = styled.View`
  padding: 10px 0px;
`;
