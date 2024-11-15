import React, { useRef, useCallback, useState, useMemo } from 'react';
import { Button, StyleSheet, Text, View, TouchableOpacity, TouchableHighlight, Image } from 'react-native';
import { CalendarProvider, DateData, WeekCalendar } from 'react-native-calendars';
import { getTheme } from '@/mocks/theme';
import { Link } from 'expo-router';
import { IconSymbol } from '@/components/ui/IconSymbol';
import FLIGHTS from '@/data/flights';
import dayjs from 'dayjs';

const ExpandableCalendarScreen = () => {
  const today = new Date().toISOString().split('T')[0];

  const [selectedDate, setSelectedDate] = useState(today);

  const onDateChanged = useCallback((dateString: string) => {
    setSelectedDate(dateString);
  }, []);

  const nextFlight = useMemo(() => {
    const selectedDateTimestamp = new Date(selectedDate).getTime();
    const timestamp = Math.max(selectedDateTimestamp, Date.now());

    const flight = FLIGHTS.find((item) => {
      return item.timestamp > timestamp;
    })

    return flight ?? null;
  }, [selectedDate]);

  const nextFlightCountDown = useMemo(() => {
    if (!nextFlight) return null;

    const selectedDateTimestamp = new Date(selectedDate).getTime();
    const timestamp = Math.max(selectedDateTimestamp, Date.now());

    const delta = nextFlight.timestamp - timestamp;
    const days = delta / (24 * 60 * 60 * 1000);
    const hours = delta % (24 * 60 * 60 * 1000);
    const hoursRemainder = hours / (60 * 60 * 1000);

    return `${days} hari ${hoursRemainder} jam`;
  }, [nextFlight, selectedDate]);

  const title = useMemo(() => {
    return dayjs(selectedDate).format("MMMM DD")
  }, [selectedDate])

  return (
    <>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "white",
          zIndex: 1,
        }}
      >
        <View style={{ width: "15%" }}>
        </View>
        <View style={{ width: "70%", justifyContent: "center", flexDirection: "row" }}>
          <Text>{title}</Text>
        </View>
        <View style={{ width: "15%", justifyContent: "flex-end", flexDirection: "row" }}>
          <Link href="/calendar" asChild>
            <TouchableOpacity style={{ padding: 6 }}>
              <IconSymbol style={{ width: 28 }} size={28} name="calendar" color="black" />
            </TouchableOpacity>
          </Link>
        </View>
      </View>

      <View style={{ backgroundColor: "white", flex: 1}}>

        <CalendarProvider
          date={today}
          onDateChanged={onDateChanged}
          showTodayButton
          // theme={getTheme()}
        >
          <WeekCalendar
            // allowShadow={false}
            firstDay={1}
            // calendarStyle={{ backgroundColor: "yellow" }}
            // theme={getTheme()}
          />
            <Text>hello world</Text>
            {/* {nextFlight && (
              <View>
                <Text>next flight:</Text>
                <Text>{nextFlight.from.iata} - {nextFlight.to.iata}</Text>
                <Text>{nextFlightCountDown}</Text>
                <Text>{nextFlightCountDown}</Text>
              </View>
            )} */}

          
          {/* {AGENDA[selectedDate]?.coverImage && (
            <Image
              style={{ width: "100%", height: "100%" }}
              source={AGENDA[selectedDate].coverImage}
            />
          )} */}

        </CalendarProvider>
      </View>
    </>
  );
};

export default ExpandableCalendarScreen;
