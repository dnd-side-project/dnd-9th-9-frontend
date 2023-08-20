import React from 'react';

import styled from '@emotion/native';

import {Gap} from '../../components/Gap';
import {WeeklyCalendar} from '../../components/WeeklyCalendar';
import {SummaryCardGroup} from '../../features/record/components/SummaryCard/SummaryCardGroup';
import useStore from '../../store/client/useStore';

export function SummaryTabScreen(): React.JSX.Element {
  const {selectedDate, setSelectedDate} = useStore();

  return (
    <StyledRecordsTabScreen>
      <Gap size="16px" />
      <WeeklyCalendar
        selectedDate={selectedDate}
        onChangeSelectedDate={setSelectedDate}
      />
      <SummaryCardGroup date={selectedDate} />
    </StyledRecordsTabScreen>
  );
}

const StyledRecordsTabScreen = styled.View`
  background-color: ${props => props.theme.palette['gray-0']};
  flex: 1;
`;
