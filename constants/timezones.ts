export type Timezone = {
  tz: string;
  name: string;
}

const TIMEZONES = {
  WIB: {
    tz: "Asia/Jakarta",
    name: "WIB",
  },
  HKT: {
    tz: "Asia/Hong_Kong",
    name: "HKT",
  },
  JST: {
    tz: "Asia/Tokyo",
    name: "JST",
  }
}

export default TIMEZONES;