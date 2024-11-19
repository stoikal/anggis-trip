import { View, StyleSheet } from 'react-native';
import { useEffect, useState } from 'react';
import CurrentTime from '@/components/CurrentTime';
import { Appbar } from 'react-native-paper';

export default function Time() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const getDate = (date: Date, timeZone: string) => {
    const formatter =  new Intl.DateTimeFormat('id-ID', {
      timeZone: timeZone,
      hour: "2-digit",
      minute: "2-digit",
    });

    return formatter.format(date);
  }

  const tokyoTime = getDate(currentTime, "Asia/Tokyo");
  const hongkongTime = getDate(currentTime, "HongKong");
  const jakartaTime = getDate(currentTime, "Asia/Jakarta");

  return (
    <>
      <Appbar.Header>
        <Appbar.Content title="Time" />
      </Appbar.Header>
      <View style={{ height: "100%" }}>
        <CurrentTime
          label="TOKYO (JST)"
          time={tokyoTime}
          style={{ height: "33%" }}
        />
        <CurrentTime
          label="HONG KONG (HKT)"
          time={hongkongTime}
          style={{ height: "33%" }}
        />
        <CurrentTime
          label="JAKARTA (WIB)"
          time={jakartaTime}
          style={{ height: "33%" }}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
