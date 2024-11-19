import { ImageRequireSource } from "react-native";
import IMAGES from "@/constants/images";

type Day = {
  coverImage: ImageRequireSource;
}

type DaysMap = {
  [key: string]: Day;
}

const DAYS: DaysMap = {
  "2024-11-22": {
    coverImage: IMAGES.JAKARTA_3,
  },

  "2024-11-23": {
    coverImage: IMAGES.TOKYO_1,
  },
  "2024-11-24": {
    coverImage: IMAGES.FUJI_1,
  },
  "2024-11-25": {
    coverImage: IMAGES.TOKYO_3,
  },
  "2024-11-26": {
    coverImage: IMAGES.TOKYO_2,
  },

  "2024-11-27": {
    coverImage: IMAGES.OSAKA_1,
  },
  "2024-11-28": {
    coverImage: IMAGES.USJ_1,
  },
  "2024-11-29": {
    coverImage: IMAGES.KYOTO_1,
  },

  "2024-11-30": {
    coverImage: IMAGES.HONGKONG_2,
  },

  "2024-12-01": {
    coverImage: IMAGES.JAKARTA_3,
  },
}

export default DAYS;
