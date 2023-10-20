import React, {useMemo} from 'react';

import styled from '@emotion/native';

import {Gap} from '../../../../components/Gap';
import {Text} from '../../../../components/Text';
import {WinStatus} from '../../const';

interface IMatchDetailRecordSummaryProps {
  totalExerciseTimeMinute?: number;
  totalBurnedCalorie?: number;
  totalRecordCount?: number;
  goalAchievedCount?: number;
  winStatus?: keyof typeof WinStatus;
}

export const MatchDetailRecordSummary = ({
  totalExerciseTimeMinute,
  totalBurnedCalorie,
  totalRecordCount,
  goalAchievedCount,
  winStatus,
}: IMatchDetailRecordSummaryProps): React.JSX.Element => {
  const exerciseTime = useMemo(() => {
    const hour = Math.floor(totalExerciseTimeMinute ?? 0 / 60);
    const minute = totalExerciseTimeMinute ?? 0 % 60;
    return `${hour}시간 ${minute}분`;
  }, [totalExerciseTimeMinute]);

  return (
    <StyledSummaryWrapper>
      <StyledSummaryTextWrapper>
        <Text type="body3" fontWeight="600" text="운동시간" />
        <Text type="body1" fontWeight="600" text={exerciseTime} />
      </StyledSummaryTextWrapper>
      <StyledSummaryTextWrapper>
        <Text type="body3" fontWeight="600" text="소모 칼로리" />
        <Text
          type="body1"
          fontWeight="600"
          text={`${totalBurnedCalorie ?? '-'}kcal`}
        />
      </StyledSummaryTextWrapper>
      <StyledSummaryTextWrapper>
        <Text type="body3" fontWeight="600" text="기록 횟수 " />
        <Text
          type="body1"
          fontWeight="600"
          text={`${totalRecordCount ?? '-'}회`}
        />
      </StyledSummaryTextWrapper>
      <StyledSummaryTextWrapper>
        <Text type="body3" fontWeight="600" text="활동링 달성 횟수" />
        <Text
          type="body1"
          fontWeight="600"
          text={`${goalAchievedCount ?? '-'}회`}
        />
      </StyledSummaryTextWrapper>
      <Gap size="12px" />
      <Text
        type="body3"
        fontWeight="600"
        textAlign="center"
        text={WinStatus[winStatus ?? 'DEFAULT']}
      />
    </StyledSummaryWrapper>
  );
};

const StyledSummaryWrapper = styled.View`
  padding: 20px;
  border-radius: ${props => props.theme.borderRadius.md};
  background-color: ${props => props.theme.palette['gray-50']};
`;

const StyledSummaryTextWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin: 8px 0px;
`;
