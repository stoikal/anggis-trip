import { FlightEndpoint } from "@/data/flights";
import { StyleProp, View, ViewStyle } from "react-native";
import { Text } from "react-native-paper";

type FlightEndpointDetailProps = {
  endpoint: FlightEndpoint;
  style?: StyleProp<ViewStyle>;
}

export default function FlightEndpointDetail (props: FlightEndpointDetailProps) {
  const getDate = (flightEndpoint: FlightEndpoint) => {
    const formatter =  new Intl.DateTimeFormat('id-ID', {
      timeZone: flightEndpoint.airport.timezone.tz,
      day: "2-digit",
      month: "short",
    });

    const date = new Date(flightEndpoint.timestamp)
    return formatter.format(date);
  }

  const getHours = (flightEndpoint: FlightEndpoint) => {
    const formatter =  new Intl.DateTimeFormat('id-ID', {
      timeZone: flightEndpoint.airport.timezone.tz,
      hour: "2-digit",
      minute: "2-digit",
    });

    const date = new Date(flightEndpoint.timestamp)
    return formatter.format(date);
  }

  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: 12,
        ...props.style as object,
      }}
    >
      <Text style={{ marginBottom: 2 }}>{props.endpoint.airport.city} · {getDate(props.endpoint)}</Text>
  
      <Text>
        <Text variant="titleLarge">{getHours(props.endpoint)}</Text>
        <Text> {props.endpoint.airport.timezone.name}</Text>
      </Text>
      <Text>Terminal {props.endpoint.terminal}</Text>
    </View>
  )
}