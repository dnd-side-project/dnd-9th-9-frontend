import React from 'react';

import {View} from 'react-native';
import CalendarStrip from 'react-native-calendar-strip';

import {theme} from '../../assets/styles/theme';
import {dayjs} from '../../lib/dayjs';
import {Text} from '../Text';

interface IWeeklyCalendarProps {
  selectedDate?: dayjs.Dayjs;
  onChangeSelectedDate?: (date: dayjs.Dayjs) => void;
}

export function WeeklyCalendar({
  selectedDate = dayjs(),
  onChangeSelectedDate,
}: IWeeklyCalendarProps): React.JSX.Element {
  const today = dayjs();

  const handleDateSelected = (selectedDate: dayjs.Dayjs): void => {
    onChangeSelectedDate?.(selectedDate);
  };

  const goToToday = (): void => {
    onChangeSelectedDate?.(today);
  };

  return (
    <View>
      <Text
        text="오늘"
        type="body2"
        fontWeight="600"
        onPress={goToToday}
        style={{position: 'absolute', right: 16, zIndex: 1}}></Text>

      <CalendarStrip
        scrollable
        scrollerPaging
        useIsoWeekday
        scrollToOnSetSelectedDate={false}
        daySelectionAnimation={{
          type: 'background',
          duration: 300,
          highlightColor: selectedDate.isSame(today, 'date')
            ? theme.palette['gray-950']
            : theme.palette['gray-400'],
        }}
        calendarHeaderFormat="YYYY년 M월"
        calendarHeaderStyle={{
          ...theme.typography.body2,
          alignSelf: 'flex-start',
          fontSize: 18,
          marginLeft: 16,
          fontWeight: '600',
        }}
        style={{
          height: 100,
        }}
        iconStyle={{display: 'none'}}
        dateNameStyle={{fontSize: 8}}
        highlightDateNameStyle={{
          color: selectedDate.isSame(today, 'date')
            ? theme.palette['gray-0']
            : theme.palette['gray-950'],
          fontSize: 8,
        }}
        highlightDateNumberStyle={{
          color: selectedDate.isSame(today, 'date')
            ? theme.palette['gray-0']
            : theme.palette.black,
        }}
        customDatesStyles={[
          {
            startDate: today,
            dateContainerStyle: {
              borderWidth: 1,
              borderColor: theme.palette['gray-950'],
            },
          },
        ]}
        selectedDate={selectedDate.toDate()}
        onDateSelected={date => {
          handleDateSelected(dayjs(date.toDate()));
        }}
      />
    </View>
  );
}
