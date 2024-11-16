import React, { useCallback, useState, useMemo } from 'react';
import { View, Image, ScrollView } from 'react-native';
import { CalendarProvider, DateData, WeekCalendar } from 'react-native-calendars';
import { useRouter } from 'expo-router';
import FLIGHTS from '@/data/flights';
import { Appbar } from 'react-native-paper';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import DAYS from '@/data/days';
import { Avatar, Button, Card, Text } from 'react-native-paper';
import COLORS from '@/constants/colors';

dayjs.extend(duration);

const WeekViewScreen = () => {
  const today = new Date().toISOString().split('T')[0];

  const [selectedDate, setSelectedDate] = useState(today);

  const router = useRouter();

  const onDateChanged = useCallback((dateString: string) => {
    setSelectedDate(dateString);
  }, []);

  const nextFlight = useMemo(() => {
    const selectedDateTimestamp = dayjs(selectedDate).valueOf();
    const timestamp = Math.max(selectedDateTimestamp, dayjs().valueOf());

    const flight = FLIGHTS.find((item) => {
      return item.timestamp > timestamp;
    })

    return flight ?? null;
  }, [selectedDate]);


  const nextFlightCountDown = useMemo(() => {
    if (!nextFlight) return "";

    const selectedDateTimestamp = dayjs(selectedDate).valueOf();
    const nowTimestamp = dayjs().valueOf();

    const timetamp = Math.max(selectedDateTimestamp, nowTimestamp);

    const next = dayjs(nextFlight.timestamp);

    const diff = next.diff(timetamp)
    const dur = dayjs.duration(diff);

    const day = dur.days();
    const hour = dur.hours();
    const minutes = dur.minutes();

    return `${day} days ${hour} hours ${minutes} minutes`;
  }, [nextFlight, selectedDate]);

  const title = useMemo(() => {
    return dayjs(selectedDate).format("MMMM DD")
  }, [selectedDate])

  // USER

  // pesan sesuatu
  // tanya arah
  // cara
  // tanya harga

  // day trip tgl 25 tokyo fuji, 28 kyoto
  // H - trip
  // budget planner

  // // current weather

  return (
    <>
      <Appbar.Header>
        {/* <Appbar.BackAction /> */}
        <Appbar.Content title={title} />
        <Appbar.Action icon="calendar" onPress={() => router.push("/(tabs)/(agenda)/calendar")} />
      </Appbar.Header>

      <View style={{ backgroundColor: "white", flex: 1}}>

        <CalendarProvider
          date={today}
          onDateChanged={onDateChanged}
          showTodayButton
        >
          <WeekCalendar
            firstDay={1}
            markingType="period"
            markedDates={{
              "2024-11-22": { color: COLORS.JAKARTA, textColor: "white", startingDay: true },
              "2024-11-23": { color: COLORS.TOKYO, textColor: "white" },
              "2024-11-24": { color: COLORS.TOKYO, textColor: "white" },
              "2024-11-25": { color: COLORS.TOKYO, textColor: "white" },
              "2024-11-26": { color: COLORS.TOKYO, textColor: "white" },
              "2024-11-27": { color: COLORS.OSAKA, textColor: "white" },
              "2024-11-28": { color: COLORS.OSAKA, textColor: "white" },
              "2024-11-29": { color: COLORS.OSAKA, textColor: "white" },
              "2024-11-30": { color: COLORS.HONGKONG, textColor: "white" },
              "2024-12-01": { color: COLORS.JAKARTA, textColor: "white", endingDay: true },
            }}
          />
          
          <View style={{ flex: 1, position: "relative" }}>
            {DAYS[selectedDate]?.coverImage && (
              <Image
                style={{ width: "100%", height: "100%", position: "absolute" }}
                source={DAYS[selectedDate].coverImage}
              />
            )}
            <ScrollView style={{ height: "100%", position: "relative", flex: 1, padding: 16 }}>
              {nextFlight && (
                <Card style={{ marginBottom: 16 }}>
                  <Card.Title title="Next Flight" />
                  <Card.Content>
                    <Text>{nextFlight.from.iata} - {nextFlight.to.iata}</Text>
                    <Text>{nextFlightCountDown}</Text>
                  </Card.Content>
                </Card>
              )}            
            </ScrollView>
          </View>

        </CalendarProvider>
      </View>
    </>
  );
};

export default WeekViewScreen;
