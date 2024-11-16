import { ImageRequireSource } from "react-native";
import IMAGES from "@/constants/images";

type Day = {
  coverImage: ImageRequireSource;
}

type DaysMap = {
  [key: string]: Day;
}

const DAYS: DaysMap = {
  "2024-11-15": {
    coverImage: IMAGES.JAKARTA_2,
  },
  "2024-11-16": {
    coverImage: IMAGES.TOKYO_1,
  },
}

export default DAYS;
