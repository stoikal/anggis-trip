import React, {useRef, useCallback, useState} from 'react';
import {StyleSheet, Text} from 'react-native';
import {CalendarProvider, DateData, WeekCalendar} from 'react-native-calendars';
import {getTheme, themeColor, lightThemeColor} from '@/mocks/theme';
import { Link } from 'expo-router';

interface Props {
  weekView?: boolean;
}

const ExpandableCalendarScreen = (props: Props) => {
  const today = new Date().toISOString().split('T')[0];

  const [selectedDate, setSelectedDate] = useState(today);

  const todayBtnTheme = useRef({
    todayButtonTextColor: themeColor
  });

  const onDateChanged = useCallback((dateString: string) => {
    setSelectedDate(dateString);
  }, []);

  return (
    <>
      <Text>
        next plane
      </Text>
      <CalendarProvider
        date={today}
        onDateChanged={onDateChanged}
        showTodayButton
        theme={todayBtnTheme.current}
      >
        <WeekCalendar
          // allowShadow={false}
          firstDay={1}
        />
        <Text>
          next plane
        </Text>

        <Text>
          {selectedDate}
        </Text>

        <Link href="/calendar">View details</Link>
      </CalendarProvider>
    </>
  );
};

export default ExpandableCalendarScreen;
