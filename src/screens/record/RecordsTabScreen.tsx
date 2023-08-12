import {useState} from 'react';
import {WeeklyCalendar} from '../../components/WeeklyCalendar';
import {dayjs} from '../../lib/dayjs';
import {WorkoutCardGroup} from '../../features/record/components';
import styled from '@emotion/native';
import {Gap} from '../../components/Gap';

export const RecordsTabScreen = () => {
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
