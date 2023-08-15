import React, {useState} from 'react';

import styled from '@emotion/native';

import {Gap} from '../../components/Gap';
import {WeeklyCalendar} from '../../components/WeeklyCalendar';
import {WorkoutCardGroup} from '../../features/record/components';
import {dayjs} from '../../lib/dayjs';

export const RecordsTabScreen = (): React.JSX.Element => {
  const [selectedDate, setSelectedDate] = useState(dayjs());

  return (
    <StyledRecordsTabScreen>
      <Gap size="16px" />
      <WeeklyCalendar
        defaultSelectedDate={selectedDate}
        onChangeSelectedDate={setSelectedDate}
      />
      <WorkoutCardGroup selectedDate={selectedDate} />
    </StyledRecordsTabScreen>
  );
};

const StyledRecordsTabScreen = styled.View`
  background-color: ${props => props.theme.palette['gray-0']};
  height: 100%;
`;
