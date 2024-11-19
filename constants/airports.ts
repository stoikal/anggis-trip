import TIMEZONES, { Timezone } from "./timezones";

export type Airport = {
  iata: string;
  name: string;
  timezone: Timezone;
  city: string;
}

const AIRPORTS = {
  // JAKARTA

  SOETTA: {
    iata: "CGK",
    name: "Soekarno-Hatta",
    timezone: TIMEZONES.WIB,
    city: "Jakarta",
  },

  // TOKYO

  NARITA: {
    iata: "NRT",
    name: "Narita",
    city: "Tokyo",
    timezone: TIMEZONES.JST,
  },

  // OSAKA

  KANSAI: {
    iata: "KIX",
    name: "Kansai",
    city: "Osaka",
    timezone: TIMEZONES.JST,
  },

  // HONG KONG

  HONGKONG: {
    iata: "HKG",
    name: "Hong Kong",
    city: "Hong Kong",
    timezone: TIMEZONES.HKT,
  }
} as const;

export default AIRPORTS;
