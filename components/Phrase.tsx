import { View } from "react-native";
import { Text } from "react-native-paper";

type PhraseProps = {
  eng: string;
  jap: string;
}

export default function Phrase (props: PhraseProps) {
  return (
    <View style={{ marginBottom: 16 }}>
      <Text>{props.eng}</Text>
      <Text variant="titleSmall">{props.jap}</Text>
    </View>
  )
}