type AgendaItem = {
  coverImage: any;
}

const IMAGES = {
  JAKARTA_1: require("@/assets/images/cover/marcel-ardivan-M2XADSBOWYo-unsplash.jpg"),
  JAKARTA_2: require("@/assets/images/cover/reza-badar-RtDNzjhr-6A-unsplash.jpg"),
  TOKYO_1: require("@/assets/images/cover/jaison-lin-2WHTac8jVA8-unsplash.jpg"),
  TOKYO_2: require("@/assets/images/cover/meric-dagli-7NBO76G5JsE-unsplash.jpg"),
}


const DAYS: Record<string, AgendaItem> = {
  "2024-11-15": {
    coverImage: IMAGES.JAKARTA_1,
  },
  "2024-11-16": {
    coverImage: IMAGES.TOKYO_1,
  },
}

export default DAYS;
