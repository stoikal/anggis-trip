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
    coverImage: IMAGES.TOKYO_3,
    // bakurocho, ramen
  },
  "2024-11-24": {
    coverImage: IMAGES.TOKYO_1,
    // sensoji, skytree, shibuya crossing
  },
  "2024-11-25": {
    coverImage: IMAGES.FUJI_1,
    // Fujikawaguchiko, Lake Kawaguchiko
  },
  "2024-11-26": {
    coverImage: IMAGES.TOKYO_2,
    // Harajuku, meiji shrine, akihabara
  },

  "2024-11-27": {
    coverImage: IMAGES.OSAKA_1,
    // osaka castle, dotonbori
  },
  "2024-11-28": {
    coverImage: IMAGES.FUSHIMI_INARI_1,
    // kyoto, Kinkakuji Temple, Fushimi Inari Shrine 
  },
  "2024-11-29": {
    coverImage: IMAGES.USJ_1,
    // usj
  },

  "2024-11-30": {
    coverImage: IMAGES.HONGKONG_2,
  },

  "2024-12-01": {
    coverImage: IMAGES.JAKARTA_3,
  },
}

export default DAYS;
