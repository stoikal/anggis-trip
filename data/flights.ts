type Airport = {
  iata: string;
  name: string;
}

type Flight = {
  from: Airport;
  to: Airport;
  timestamp: number;
}

const AIRPORTS = {
  // JAKARTA

  SOETTA: {
    iata: "CGK",
    name: "Soekarno-Hatta",
  },

  // TOKYO

  NARITA: {
    iata: "NRT",
    name: "Narita",
  },

  HANEDA: {
    iata: "HND",
    name: "Haneda"
  },

  // OSAKA

  ITAMI: {
    iata: "HND",
    name: "Haneda"
  },

  KANSAI: {
    iata: "HND",
    name: "Haneda"
  },

  KOBE: {
    iata: "HND",
    name: "Haneda"
  },

  // HONG KONG

  HONGKONG: {
    iata: "HKG",
    name: "Chek Lap Kok"
  }
} as const;

const getTimestamp = (date: string, time: string, offset: string): number => {
  const iso = `${date}T${time}:00${offset}`;

  return new Date(iso).getTime();
}


const FLIGHTS: Flight[] = [
  {
    from: AIRPORTS.SOETTA,
    to: AIRPORTS.HONGKONG,
    timestamp: getTimestamp("2024-11-23", "00:15", "+07:00"),
  },
  {
    from: AIRPORTS.HONGKONG, 
    to: AIRPORTS.NARITA,
    timestamp: getTimestamp("2024-11-23", "10:30", "+08:00"),
  },
  {
    from: AIRPORTS.ITAMI,
    to: AIRPORTS.HONGKONG,
    timestamp: getTimestamp("2024-11-30", "09:25", "+09:00"),
  },
  {
    from: AIRPORTS.HONGKONG,
    to: AIRPORTS.SOETTA,
    timestamp: getTimestamp("2024-12-01", "09:20", "+08:00"),
  },
]

export default FLIGHTS;
