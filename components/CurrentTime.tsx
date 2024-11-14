import { View, Text, StyleSheet } from 'react-native';
import { StyleProp, ViewStyle } from 'react-native';

export type CurrentTimeProps = {
  label: string;
  time: string;
  style?: StyleProp<ViewStyle>;
};

export default function CurrentTime(props: CurrentTimeProps) {
  return (
    <View style={props.style}>
      <View
        style={{
          height: "100%",
          alignItems: "center",
          justifyContent: "flex-start",
          paddingTop: 40
        }}
      >
        <View >
          <Text
            style={{
              fontSize: 20,
              textAlign: "center"
            }}
          >
            {props.label}
          </Text>
        </View>
        <View>
          <Text
            style={{
              textAlign: "center",
              fontSize: 56,
            }}
          >
            {props.time}
          </Text>
        </View>
      </View>
    </View>
  );
}
