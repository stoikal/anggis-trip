import { Flight } from "@/data/flights";
import dayjs from "dayjs";
import duration from 'dayjs/plugin/duration';
import { StyleProp, View, ViewStyle } from 'react-native';
import { Surface, Text } from "react-native-paper";
import FlightEndpointDetail from './FlightEndpointDetail';

dayjs.extend(duration);

type FlightCardProps = {
  flight: Flight;
  countdown: string;
  style?: StyleProp<ViewStyle>;
};

export default function FlightCard (props: FlightCardProps) {
  const getDuration = (flight: Flight) => {
    const diff = dayjs(flight.arrival.timestamp).diff(flight.departure.timestamp);
    const duration = dayjs.duration(diff);
    
    const days = duration.days();
    const hours = duration.hours();
    const minutes = duration.minutes();

    let result = "";

    if (days) result += `${days}d `;
    if (hours) result += `${hours}h `;
    if (minutes) result += `${minutes}m `;
    
    return result;
  }

  return (
    <Surface
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.9)"
      }}
    >
      <View
        style={{
          padding: 12,
          marginBottom: 12,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text>Next flight in: {props.countdown} </Text>
        <Text> {props.flight.code}</Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: 8
        }}
      >
        <View style={{ paddingHorizontal: 12, paddingTop: 0 }}>
          <Text variant="headlineMedium">{props.flight.departure.airport.iata}&nbsp;</Text>
        </View>
        <View style={{ flex: 1, borderBottomWidth: 2, borderColor: "#ccc" }}>
          <Text style={{ textAlign: "center"}} variant="labelMedium">{getDuration(props.flight)}</Text>
        </View>
        <View style={{ paddingHorizontal: 12, paddingTop: 0 }}>
          <Text variant="headlineMedium">&nbsp;{props.flight.arrival.airport.iata}</Text>
        </View>
      </View>
      
      <View style={{ flexDirection: "row", marginBottom: 12 }}>
        <FlightEndpointDetail
          endpoint={props.flight.departure}
        />

        <FlightEndpointDetail
          endpoint={props.flight.arrival}
          style={{
            borderLeftWidth: 1,
            borderColor: "#ccc",
          }}
        />
      </View>
    </Surface>
  )
}
