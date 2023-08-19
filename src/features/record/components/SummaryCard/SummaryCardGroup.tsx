import React from 'react';

import styled from '@emotion/native';

import {Text} from '../../../../components/Text';
import {type dayjs} from '../../../../lib/dayjs';
import {useGetExerciseSummary} from '../../hooks/exercise';

interface IProps {
  date: dayjs.Dayjs;
}

export const SummaryCardGroup = ({date}: IProps): React.JSX.Element => {
  // TODO: 해당 API 운동 기록이 없는 경우 판단 기준 데이터 필드 확인하기
  const {data: summaryData} = useGetExerciseSummary({
    date: date.format('YYYY-MM-DD'),
  });

  const getFormattedTime = (minute: number): string => {
    const h = Math.floor(minute / 60);
    const m = minute % 60;

    const formattedHours = h > 0 ? `${h}시간 ` : '';
    const formattedMinutes = m > 0 || h === 0 ? `${m}분` : '';
    return `${formattedHours}${formattedMinutes}`;
  };

  return (
    <StyledSummaryCardGroup>
      <StyledSummaryCard>
        <Text type="body2" text="🔥 총 소비 칼로리" fontWeight="600" />
        <Text
          type="head2"
          text={`${summaryData?.totalBurnedCalorie ?? 0}kcal`}
          fontWeight="600"
        />
      </StyledSummaryCard>
      <StyledSummaryCard>
        <Text type="body2" text="💪 운동 소비 칼로리" fontWeight="600" />
        <Text
          type="head2"
          text={`${summaryData?.totalExerciseCalorie ?? 0}kcal`}
          fontWeight="600"
        />
      </StyledSummaryCard>
      <StyledSummaryCard>
        <Text type="body2" text="🏃 운동시간" fontWeight="600" />
        <Text
          type="head2"
          text={getFormattedTime(summaryData?.totalExerciseTimeMinute ?? 0)}
          fontWeight="600"
        />
      </StyledSummaryCard>
      <StyledSummaryCard>
        <Text type="body2" text="✍️ 기록 횟수" fontWeight="600" />
        <Text
          type="head2"
          text={`${summaryData?.totalRecordCount ?? 0}회`}
          fontWeight="600"
        />
      </StyledSummaryCard>
      <StyledSummaryCard style={{marginBottom: 36}}>
        <Text type="body2" text="👣 걸음수" fontWeight="600" />
        {/* TODO 해당 데이터 API 연동 없이 apple 데이터 사용인지 확인 */}
        <Text type="head2" text={`${0}걸음`} fontWeight="600" />
      </StyledSummaryCard>
    </StyledSummaryCardGroup>
  );
};

const StyledSummaryCardGroup = styled.ScrollView`
  flex: 1;
  border-top-width: 1px;
  border-top-color: ${props => props.theme.palette['gray-50']};
  padding: 16px;
`;

const StyledSummaryCard = styled.View`
  border-radius: 12px;
  background-color: ${props => props.theme.palette['gray-50']};
  padding: 14px 12px 20px;
  gap: 24px;
  margin-bottom: 16px;
`;
