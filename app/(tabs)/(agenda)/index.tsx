import React, { useCallback, useState, useMemo } from 'react';
import { View, Image, ScrollView } from 'react-native';
import { CalendarProvider, DateData, WeekCalendar } from 'react-native-calendars';
import { useRouter } from 'expo-router';
import FLIGHTS, { Flight } from '@/data/flights';
import { Appbar } from 'react-native-paper';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import DAYS from '@/data/days';
import { Avatar, Button, Card, Text } from 'react-native-paper';
import COLORS from '@/constants/colors';

dayjs.extend(duration);

const WeekViewScreen = () => {
  const router = useRouter();

  const today = new Date().toISOString().split('T')[0];

  const [selectedDate, setSelectedDate] = useState(today);

  const onDateChanged = useCallback((dateString: string) => {
    setSelectedDate(dateString);
  }, []);

  const getCountDown = (flight: Flight, fromTimestamp: number) => {
    const next = dayjs(flight.timestamp);

    const diff = next.diff(fromTimestamp)
    const duration = dayjs.duration(diff);

    const days = duration.days();
    const hours = duration.hours();
    const minutes = duration.minutes();

    let result = "";

    if (days > 1) {
      result += `${days} days `;
    } else if (days === 1) {
      result += `${days} day `;
    }

    if (hours > 1) {
      result += `${hours} hours `;
    } else if (hours === 1) {
      result += `${hours} hour `;
    } else if (days > 0 && minutes > 0) {
      result += `${hours} hours `;
    }

    if (minutes > 1) {
      result += `${minutes} minutes `;
    } else if (minutes === 1) {
      result += `${minutes} minute `;
    }

    return result;
  }

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

    const now = dayjs();
    const isToday = now.isSame(selectedDate, "day");

    const timestamp = isToday ? now.valueOf() : dayjs(selectedDate).valueOf();

    return getCountDown(nextFlight, timestamp)
  }, [nextFlight, selectedDate]);

  const title = useMemo(() => {
    return dayjs(selectedDate).format("MMMM DD");
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
