import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { useRouter } from 'expo-router';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Image, ScrollView, TouchableOpacity, View } from 'react-native';
import { CalendarProvider, WeekCalendar } from 'react-native-calendars';
import { Appbar, Modal, Portal, Surface, Text, TouchableRipple } from 'react-native-paper';

import AgendaFab from '@/components/AgendaFab';
import EditNoteForm from '@/components/EditNoteForm';
import FlightCard from '@/components/FlightCard';
import NoteForm from '@/components/NoteForm';
import COLORS from '@/constants/colors';
import IMAGES from '@/constants/images';
import DAYS from '@/data/days';
import FLIGHTS, { Flight } from '@/data/flights';
import useNotes from '@/storage/useNotes';
import ExpenseCard from '@/components/ExpenseCard';
import CreateDayExpenseForm from '@/components/CreateDayExpenseForm';
import { Note } from '@/types';

dayjs.extend(duration);
dayjs.extend(utc);
dayjs.extend(timezone);

export default function WeekViewScreen () {
  const router = useRouter();

  const today = dayjs().format("YYYY-MM-DD");

  const [selectedDate, setSelectedDate] = useState(today);

  const notes = useNotes(selectedDate);

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

  const appBarTitle = useMemo(() => {
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
    } else {
      dates[selectedDate] = { selected: true };
    }

    return dates;
  }, [selectedDate, today]);

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

    return color;
  }

  const [isCreateNoteModalVisible, setIsCreateNoteModalVisible] = useState(false);
  const [isEditNoteModalVisible, setIsEditNoteModalVisible] = useState(false);
  const [noteIndex, setNoteIndex] = useState(-1);

  const getNotePressHandler = (note: Note, index: number) => () => {
    // alert(index);
    setNoteIndex(index);
    setIsEditNoteModalVisible(true);
  }

  const [isCreateExpenseModalVisible, setIsCreateExpenseVisible] = useState(false);

  const showCreateExpenseModal = () => setIsCreateExpenseVisible(true);
  const hideCreateExpenseModal = () => setIsCreateExpenseVisible(false);

  return (
    <>
      <Appbar.Header>
        <Appbar.Content title={appBarTitle} />
        <Appbar.Action icon="calendar" onPress={() => router.push("/(tabs)/(agenda)/calendar")} />
      </Appbar.Header>

      <View style={{ backgroundColor: "white", flex: 1}}>

        <CalendarProvider
          date={selectedDate}
          onDateChanged={onDateChanged}
          todayBottomMargin={32}
          showTodayButton
          theme={{
            todayButtonTextColor: COLORS.TOKYO,
          }}
        >
          <WeekCalendar
            firstDay={1}
            markingType="period"
            markedDates={markedDates}
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
              source={DAYS[selectedDate]?.coverImage || IMAGES.TANGKUBAN_2}
            />

            <ScrollView style={{ height: "100%", position: "relative", flex: 1, padding: 16 }}>
              {notes.notes.map((note, index) => (
                <TouchableRipple
                  key={index}
                  onPress={getNotePressHandler(note, index)}
                >
                  <Surface
                    key={index}
                    style={{
                      backgroundColor: "rgba(255, 255, 255, 0.96)",
                      marginBottom: 16
                    }}
                  >
                    {/* <Button onPress={() => notes.deleteByIndex(index)}>delete</Button> */}
                    <View style={{ padding: 12 }}>
                      <Text variant="titleMedium">{note.title}</Text>
                      <Text style={{ marginBottom: 8 }}>{note.content}</Text>
                    </View>
                  </Surface>
                </TouchableRipple>
              ))}

              {flights.map((flight) => (
                <FlightCard
                  key={flight.code}
                  flight={flight}
                  countdown={getCountDown(flight)}
                  style={{ marginBottom: 16 }}
                />
              ))}

              <ExpenseCard
                date={selectedDate}
              />

            
              <View style={{ height: 104 }}></View>

            </ScrollView>

          </View>
        </CalendarProvider>
        <AgendaFab
          onPressNote={() => setIsCreateNoteModalVisible(true)}
          onPressExpense={showCreateExpenseModal}
        />
        <Portal>
          <Modal
            dismissable={false}
            visible={isCreateNoteModalVisible}
            onDismiss={() => setIsCreateNoteModalVisible(false)}
            contentContainerStyle={{ backgroundColor: "white", width: "90%", marginHorizontal: "auto"}}
          >
            <NoteForm
              onSubmit={(note) => {
                notes.pushNote(note);
                setIsCreateNoteModalVisible(false)
              }}
              onCancel={() => setIsCreateNoteModalVisible(false)}
            />
          </Modal>
        </Portal>

        <Portal>
          <Modal
            dismissable={false}
            visible={isEditNoteModalVisible}
            onDismiss={() => setIsEditNoteModalVisible(false)}
            contentContainerStyle={{ backgroundColor: "white", width: "90%", marginHorizontal: "auto"}}
          >
            <EditNoteForm
              initialData={notes.notes[noteIndex]}
              onSubmit={(note) => {
                notes.updateByIndex(noteIndex, note);
                setIsEditNoteModalVisible(false);
              }}
              onCancel={() => setIsEditNoteModalVisible(false)}
              onDelete={() => {
                setIsEditNoteModalVisible(false);
                notes.deleteByIndex(noteIndex);
              }}
            />
          </Modal>
        </Portal>

        <Modal
          visible={isCreateExpenseModalVisible}
          dismissable={false}
          contentContainerStyle={{ backgroundColor: "white", width: "90%", marginHorizontal: "auto"}}
        >
          <CreateDayExpenseForm
            date={selectedDate}
            onCancel={hideCreateExpenseModal}
            onSuccess={hideCreateExpenseModal}
          />
        </Modal>
      </View>
    </>
  );
};

