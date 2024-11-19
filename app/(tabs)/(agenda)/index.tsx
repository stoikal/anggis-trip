import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { useRouter } from 'expo-router';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Image, ScrollView, View } from 'react-native';
import { CalendarProvider, WeekCalendar } from 'react-native-calendars';
import { Appbar } from 'react-native-paper';

import FlightCard from '@/components/FlightCard';
import COLORS from '@/constants/colors';
import DAYS from '@/data/days';
import FLIGHTS, { Flight } from '@/data/flights';

dayjs.extend(duration);
dayjs.extend(utc);
dayjs.extend(timezone);

const WeekViewScreen = () => {
  const router = useRouter();

  const today = new Date().toISOString().split('T')[0];

  const [selectedDate, setSelectedDate] = useState(today);

  const onDateChanged = useCallback((dateString: string) => {
    setSelectedDate(dateString);
  }, []);

  const [currentTime, setCurrentTime] = useState<Date>(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000 * 60);

    return () => clearInterval(intervalId);
  }, []);

  const getCountDown = useCallback((flight: Flight) => {
    const isToday = dayjs(currentTime).isSame(selectedDate, "day");

    const from = isToday ? currentTime : selectedDate;

    const diff = dayjs(flight.departure.timestamp).diff(from);
    const duration = dayjs.duration(diff);

    const days = duration.days();
    const hours = duration.hours();
    const minutes = duration.minutes();

    let result = "";

    if (days > 1) {
      result += `${days} days `;
    } else if (days === 1) {
      result += `${days} day `;
    } else {

      if (hours > 1) {
        result += `${hours} hours `;
      } else if (hours === 1) {
        result += `${hours} hour `;
      }
  
      if (minutes > 1) {
        result += `${minutes} minutes `;
      } else if (minutes === 1) {
        result += `${minutes} minute `;
      }
    }

    return result;
  }, [currentTime, selectedDate])

  const flights = useMemo(() => {
    const result: Flight[] = [];

    FLIGHTS.forEach((flight) => {
      const isInSelectedDay = dayjs(flight.departure.timestamp).isSame(selectedDate, "day");
      if (isInSelectedDay) {
        result.push(flight);
      }
    });

    if (result.length) return result;
    
    const selectedDateTimestamp = dayjs(selectedDate).valueOf();
    const currentLocalTimestamp = dayjs().valueOf();

    const timestamp = Math.max(selectedDateTimestamp, currentLocalTimestamp);

    const closestFlight = FLIGHTS.find((item) => {
      return item.departure.timestamp > timestamp;
    })

    if (closestFlight) result.push(closestFlight);
    
    return result;
  }, [selectedDate]);

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
              {flights.map((flight) => (
                <FlightCard
                  key={flight.code}
                  flight={flight}
                  countdown={getCountDown(flight)}
                  style={{ marginBottom: 16 }}
                />
              ))}
            </ScrollView>
          </View>

        </CalendarProvider>
      </View>
    </>
  );
};

export default WeekViewScreen;
