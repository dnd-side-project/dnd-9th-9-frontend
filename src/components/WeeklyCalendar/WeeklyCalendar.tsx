import {useState} from 'react';
import CalendarStrip from 'react-native-calendar-strip';
import {theme} from '../../assets/styles/theme';
import {dayjs} from '../../lib/dayjs';
import {Text} from '../Text';
import {View} from 'react-native';

interface IWeeklyCalendarProps {
  defaultSelectedDate?: dayjs.Dayjs;
  onChangeSelectedDate?: (date: dayjs.Dayjs) => void;
}

export function WeeklyCalendar({
  defaultSelectedDate,
  onChangeSelectedDate,
}: IWeeklyCalendarProps) {
  const today = dayjs();
  const [selectedDate, setSelectedDate] = useState(
    defaultSelectedDate || today,
  );

  const handleDateSelected = (selectedDate: dayjs.Dayjs) => {
    onChangeSelectedDate && onChangeSelectedDate(selectedDate);
    setSelectedDate(selectedDate);
  };

  const goToToday = () => {
    onChangeSelectedDate && onChangeSelectedDate(today);
    setSelectedDate(today);
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
        calendarHeaderFormat="YYYY년 MM월"
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
          handleDateSelected(dayjs(date.toString()));
        }}
      />
    </View>
  );
}
