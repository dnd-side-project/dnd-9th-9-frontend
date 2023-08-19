import React from 'react';

import styled from '@emotion/native';

import {Gap} from '../../components/Gap';
import {WeeklyCalendar} from '../../components/WeeklyCalendar';
import {WorkoutCardGroup} from '../../features/record/components';
import {useSelectedDateStore} from '../../features/record/store';

export const RecordsTabScreen = (): React.JSX.Element => {
  const {selectedDate, setSelectedDate} = useSelectedDateStore();

  return (
    <StyledRecordsTabScreen>
      <Gap size="16px" />
      <WeeklyCalendar
        selectedDate={selectedDate}
        onChangeSelectedDate={setSelectedDate}
      />
      <WorkoutCardGroup selectedDate={selectedDate} />
    </StyledRecordsTabScreen>
  );
};

const StyledRecordsTabScreen = styled.View`
  background-color: ${props => props.theme.palette['gray-0']};
  flex: 1;
`;
