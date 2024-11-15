import {Platform, TextStyle, ViewStyle} from 'react-native';

export const themeColor = 'blue';
export const lightThemeColor = '#f2f7f7';

export function getTheme() {
  const disabledColor = 'grey';

  return {
    textDayStyle: {
      color: "pink",
      
    },
    "stylesheet.calendar.header": {
      backgroundColor: "red",
      week: {
        marginTop: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        color: "yellow",
      }
    },
    "stylesheet.calendar.main": {
      backgroundColor: "red",
      week: {
        marginTop: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        color: "yellow",
      }
    },
    textSectionTitleColor: "red",
  };
}

export interface Theme {
  timelineContainer?: object;
  contentStyle?: ViewStyle;
  event?: object;
  eventTitle?: object;
  eventSummary?: object;
  eventTimes?: object;
  line?: object;
  verticalLine?: object;
  nowIndicatorLine?: object;
  nowIndicatorKnob?: object;
  timeLabel?: object;
  todayTextColor?: string;
  calendarBackground?: string;
  indicatorColor?: string;
  textSectionTitleColor?: string;
  textSectionTitleDisabledColor?: string;
  dayTextColor?: string;
  selectedDayTextColor?: string;
  monthTextColor?: string;
  selectedDayBackgroundColor?: string;
  arrowColor?: string;
  textDisabledColor?: string;
  textInactiveColor?: string;
  backgroundColor?: string; //TODO: remove in V2
  dotColor?: string;
  selectedDotColor?: string;
  disabledArrowColor?: string;
  textDayFontFamily?: TextStyle['fontFamily'];
  textMonthFontFamily?: TextStyle['fontFamily'];
  textDayHeaderFontFamily?: TextStyle['fontFamily'];
  textDayFontWeight?: TextStyle['fontWeight'];
  textMonthFontWeight?: TextStyle['fontWeight'];
  textDayHeaderFontWeight?: TextStyle['fontWeight'];
  textDayFontSize?: number;
  textMonthFontSize?: number;
  textDayHeaderFontSize?: number;
  agendaDayTextColor?: string;
  agendaDayNumColor?: string;
  agendaTodayColor?: string;
  agendaKnobColor?: string;
  todayButtonFontFamily?: TextStyle['fontFamily'];
  todayButtonFontWeight?: TextStyle['fontWeight'];
  todayButtonFontSize?: number;
  textDayStyle?: TextStyle;
  dotStyle?: object;
  arrowStyle?: ViewStyle;
  todayBackgroundColor?: string;
  disabledDotColor?: string;
  inactiveDotColor?: string;
  todayDotColor?: string;
  todayButtonTextColor?: string;
  todayButtonPosition?: string;
  arrowHeight?: number;
  arrowWidth?: number;
  weekVerticalMargin?: number;
  reservationsBackgroundColor?: string;
  stylesheet?: {
    calendar?: {
      main?: object; 
      header?: object;
    };
    day?: {
      basic?: object; 
      period?: object;
    };
    dot?: object;
    marking?: object;
    'calendar-list'?: {
      main?: object;
    };
    agenda?: {
      main?: object; 
      list?: object;
    };
    expandable?: {
      main?: object;
    };
  };
}