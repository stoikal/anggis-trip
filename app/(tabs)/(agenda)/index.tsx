import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { useRouter } from 'expo-router';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Image, ScrollView, TouchableOpacity, View } from 'react-native';
import { CalendarProvider, WeekCalendar } from 'react-native-calendars';
import { Appbar, Text } from 'react-native-paper';

import FlightCard from '@/components/FlightCard';
import COLORS from '@/constants/colors';
import DAYS from '@/data/days';
import FLIGHTS, { Flight } from '@/data/flights';
import IMAGES from '@/constants/images';

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

    const now = dayjs();

    FLIGHTS.forEach((flight) => {
      const isInSelectedDay = dayjs(flight.departure.timestamp).isSame(selectedDate, "day");
      const isFuture = dayjs(flight.departure.timestamp).isAfter(now);
      if (isInSelectedDay && isFuture) {
        result.push(flight);
      }
    });

    if (result.length) return result;
  

    const isToday = dayjs(now).isSame(selectedDate, "day");
    const from = isToday ? now : selectedDate;

    const closestFlight = FLIGHTS.find((item) => {
      return dayjs(item.departure.timestamp).isAfter(from);
    })

    if (closestFlight) result.push(closestFlight);
    
    return result;
  }, [selectedDate]);

  const title = useMemo(() => {
    return dayjs(selectedDate).format("MMMM DD");
  }, [selectedDate]);

  const markedDates = useMemo(() => {
    const dates: Record<string, any> = {
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
    }

    if (dates[today]) {
      dates[today].today = true;
    } else {
      dates[today] = { today: true }
    }

    if (dates[selectedDate]) {
      dates[selectedDate].selected = true;
      // dates[selectedDate].dotColor = "white";
      // dates[selectedDate].textColor = "white";
    } else {
      dates[selectedDate] = { selected: true };
    }

    return dates;
  }, [selectedDate]);

  // USER

  // pesan sesuatu
  // tanya arah
  // cara
  // tanya harga

  // day trip tgl 25 tokyo fuji, 28 kyoto
  // H - trip
  // budget planner

  // // current weather

  const getColor = (marking: any) => {
    let color = "black";

    if (marking?.color) {
      if (marking?.selected) {
        color = marking?.color;
      } else {
        color = "white";
      }
    } else if (marking?.selected) {
      color = "white";
    }

    // if (marking?.selected && !marking?.color) {
    //   color = "black";
    // }

    return color;
  }

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
          theme={{
            selectedDayTextColor: "red"
          }}
        >
          <WeekCalendar
            firstDay={1}
            markingType="period"
            markedDates={markedDates}
            customHeaderTitle={<Text>ss</Text>}
            dayComponent={({date, state, marking}) => {
              return (
                <TouchableOpacity onPress={() => onDateChanged(date?.dateString as string)}>
                  <View
                    style={{
                      backgroundColor: marking?.color,
                      width: 56,
                      height: "100%",
                      justifyContent: "center",
                      ...marking?.startingDay && {
                        borderBottomLeftRadius: 20,
                        borderTopLeftRadius: 20,
                      },
                      ...marking?.endingDay && {
                        borderBottomRightRadius: 20,
                        borderTopRightRadius: 20,
                      }
                    }}
                  >
                    {marking?.selected && (

                      <View
                        style={{
                          width: 28,
                          height: 28,
                          backgroundColor: marking?.color ? "white" : "black",
                          position: "absolute",
                          left: "50%",
                          top: "50%",
                          transform: "translate(-50%, -50%);",
                          borderRadius: "50%",
                        }}
                      />
                    )}
                    <Text
                      variant="bodyLarge"
                      style={{
                        textAlign: 'center',
                        color: (getColor(marking)),
                        fontWeight: marking?.today ? 'bold' : 'regular'
                      }}
                    >
                      {date?.day}
                    </Text>

                  </View>
                </TouchableOpacity>
              );
            }}
          />
          
          <View style={{ flex: 1, position: "relative" }}>
            <Image
              style={{ width: "100%", height: "100%", position: "absolute" }}
              source={DAYS[selectedDate]?.coverImage || IMAGES.TANGKUBAN_1}
            />

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
