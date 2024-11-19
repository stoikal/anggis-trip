import dayjs from "dayjs";
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

import AIRPORTS, { Airport } from "@/constants/airports";
import { Timezone } from "@/constants/timezones";

dayjs.extend(utc);
dayjs.extend(timezone);


export type Timestamp = number;

export type FlightEndpoint = {
  airport: Airport;
  timestamp: Timestamp;
  terminal?: string;
  gate?: string;
}

type Departure = FlightEndpoint;
type Arrival = FlightEndpoint;

export type Flight = {
  code: string;
  departure: Departure;
  arrival: Arrival;
}

const getTimestamp = (date: string, time: string, timezone: Timezone) => {
  const dateString = `${date}T${time}:00`;
  const day = dayjs.tz(dateString, timezone.tz);
  const timestamp = day.valueOf();

  return timestamp;
}

const FLIGHTS: Flight[] = [
  {
    code: "CX796",
    departure: {
      airport: AIRPORTS.SOETTA,
      terminal: "3",
      timestamp: getTimestamp("2024-11-23", "00:15", AIRPORTS.SOETTA.timezone),
    },
    arrival: {
      airport: AIRPORTS.HONGKONG,
      terminal: "1",
      timestamp: getTimestamp("2024-11-23", "06:05", AIRPORTS.HONGKONG.timezone),
    },
  },
  {
    code: "CX520",
    departure: {
      airport: AIRPORTS.HONGKONG,
      terminal: "1",
      timestamp: getTimestamp("2024-11-23", "10:30", AIRPORTS.HONGKONG.timezone),
    },
    arrival: {
      airport: AIRPORTS.NARITA,
      terminal: "2",
      timestamp: getTimestamp("2024-11-23", "15:35", AIRPORTS.NARITA.timezone),
    },
  },
  {
    code: "CX567",
    departure: {
      airport: AIRPORTS.KANSAI,
      terminal: "1",
      timestamp: getTimestamp("2024-11-30", "09:25", AIRPORTS.KANSAI.timezone),
    },
    arrival: {
      airport: AIRPORTS.HONGKONG,
      terminal: "1",
      timestamp: getTimestamp("2024-11-30", "13:00", AIRPORTS.HONGKONG.timezone),
    },
  },
  {
    code: "CX777",
    departure: {
      airport: AIRPORTS.HONGKONG,
      terminal: "1",
      timestamp: getTimestamp("2024-12-01", "09:20", AIRPORTS.HONGKONG.timezone),
    },
    arrival: {
      airport: AIRPORTS.SOETTA,
      terminal: "3",
      timestamp: getTimestamp("2024-12-01", "13:20", AIRPORTS.SOETTA.timezone),
    }
  },
];

export default FLIGHTS;
