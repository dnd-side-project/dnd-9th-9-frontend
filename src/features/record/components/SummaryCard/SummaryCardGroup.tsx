import React from 'react';

import styled from '@emotion/native';

import {SummaryCardItem} from './SummaryCardItem';
import {type dayjs} from '../../../../lib/dayjs';
import {useGetExerciseSummary} from '../../hooks/exercise';

interface ISummaryCardGroupProps {
  date: dayjs.Dayjs;
}

export const SummaryCardGroup = ({
  date,
}: ISummaryCardGroupProps): React.JSX.Element => {
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
      <SummaryCardItem
        text="🔥 총 소비 칼로리"
        value={`${summaryData?.totalBurnedCalorie ?? 0}kcal`}
      />
      <SummaryCardItem
        text="💪 운동 소비 칼로리"
        value={`${summaryData?.totalExerciseCalorie ?? 0}kcal`}
      />
      <SummaryCardItem
        text="🏃 운동시간"
        value={getFormattedTime(summaryData?.totalExerciseTimeMinute ?? 0)}
      />
      <SummaryCardItem
        text="✍️ 기록 횟수"
        value={`${summaryData?.totalRecordCount ?? 0}회`}
      />
      {/* TODO 해당 데이터 API 연동 없이 apple 데이터 사용인지 확인 */}
      <SummaryCardItem text="👣 걸음수" value={`${0}걸음`} />
    </StyledSummaryCardGroup>
  );
};

const StyledSummaryCardGroup = styled.ScrollView`
  flex: 1;
  border-top-width: 1px;
  border-top-color: ${props => props.theme.palette['gray-50']};
  padding: 16px;
`;
