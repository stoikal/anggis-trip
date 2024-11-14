import { View, Text, StyleSheet } from 'react-native';

export default function DetailsScreen() {
  return (
    <View style={styles.container}>
      <View>
        <Text>KBRI di Tokyo</Text>
        <Text>Kedutaan Besar Republik Indonesia</Text>
        <Text>5-2-9 Higashigotanda, Shinagawa Ward, Tokyo 141-0022</Text>
        <Text>+81-03-3441-4201</Text>
        <Text>info@kbritokyo.jp</Text>
      </View>
  
      <View>
        <Text>KJRI di Osaka</Text>
        <Text>Konsulat Jenderal Republik Indonesia</Text>
        <Text>Nakanoshima Intes Building 22 F, 6-2-40, Nakanoshima Kita-ku Osaka 530-0005</Text>
        <Text>(81-6) 6449-9898</Text>
        <Text>(81-6) 6449-9883</Text>
        <Text>kjri-osaka@indonesia-osaka.org</Text>
        <Text>osaka.kjri@kemlu.go.id</Text>
        <Text>consular@indonesia-osaka.org</Text>
      </View>

      <View>
        <Text>
          Pemadam kebakaran/Ambulans: 119
        </Text>
        <Text>
          Polisi: 110
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
