import COLORS from '@/constants/colors';
import { useRouter } from 'expo-router';
import { StyleSheet } from 'react-native';
import { CalendarList, DateData } from 'react-native-calendars';
import { Appbar } from 'react-native-paper';

export default function HomeScreen() {
  const currentMonth = new Date().getMonth() + 1;
  const monthBegin = 11;
  const monthEnd = 12;

  const pastScrollRange = Math.max(currentMonth - monthBegin, 0);
  const futureScrollRange = Math.max(monthEnd - currentMonth, 0);

  const handleDayPress = (e: DateData) => {
    alert(e.dateString);
  }

  const router = useRouter();

  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => router.push("/(tabs)/(agenda)")} />
      </Appbar.Header>
      {/* <View style={styles.container}> */}
        {/* <Calendar
          // hideExtraDays={false}
          // showSixWeeks
          onDayPress={(day: string) => {
            console.log('selected day', day);
          }}
        /> */}
        <CalendarList
          pastScrollRange={pastScrollRange}
          futureScrollRange={futureScrollRange}
          // markingType="multi-period"
          // markedDates={{
          //   '2024-11-22': {
          //     periods: [
          //       { color: COLORS.JAKARTA, startingDay: true },
          //     ],
          //   },
          //   '2024-11-23': {
          //     periods: [
          //       { color: COLORS.JAKARTA, endingDay: true  },
          //       { color: COLORS.HONGKONG, startingDay: true, endingDay: true },
          //       { color: COLORS.TOKYO, startingDay: true },
          //     ],
          //   },
          //   '2024-11-24': {
          //     periods: [
          //       { color: COLORS.TOKYO },
          //     ],
          //   },
          //   '2024-11-25': {
          //     periods: [
          //       { color: COLORS.TOKYO },
          //     ],
          //   },
          //   '2024-11-26': {
          //     periods: [
          //       { color: COLORS.TOKYO },
          //     ],
          //   },
          //   '2024-11-27': {
          //     periods: [
          //       { color: COLORS.OSAKA },
          //     ],
          //   },
          //   '2024-11-28': {
          //     periods: [
          //       { color: COLORS.OSAKA },
          //     ],
          //   },
          //   '2024-11-29': {
          //     periods: [
          //       { color: COLORS.OSAKA },
          //     ],
          //   },
          //   '2024-11-30': {
          //     periods: [
          //       { color: COLORS.OSAKA, endingDay: true },
          //       { color: COLORS.HONGKONG, startingDay: true },
          //     ],
          //   },
          //   '2024-12-01': {
          //     periods: [
          //       { color: COLORS.HONGKONG, endingDay: true, },
          //       { color: COLORS.JAKARTA, startingDay: true, endingDay: true },
          //     ],
          //   },
          // }}
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
          onDayPress={handleDayPress}
        />
      {/* </View> */}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // maxHeight: "100%"
  },
});
