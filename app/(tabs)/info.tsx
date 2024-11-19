import { View, StyleSheet, Linking, TouchableOpacity, ScrollView, TouchableHighlight, TouchableWithoutFeedback } from 'react-native';
import { Text, Button, Appbar } from 'react-native-paper';

export default function DetailsScreen() {
  const openMap = (url: string) => {
    // https://maps.app.goo.gl/fsRWhsPP1AGfueDG8
    Linking.openURL(url);
  }

  const openPhone = (phoneNum: string) => {
    const url = `tel:${phoneNum}`;
    Linking.openURL(url);
  }

  return (
    <>
      <Appbar.Header>
        <Appbar.Content title="Contacts" />
      </Appbar.Header>
      <ScrollView>
        <View style={styles.container}>
          <View style={{ marginBottom: 24 }}>
            <Text variant="titleLarge">KBRI Tokyo</Text>
            <Text variant="titleMedium">Kedutaan Besar Republik Indonesia</Text>

            <TouchableOpacity
              onPress={() => Linking.openURL("https://maps.app.goo.gl/fsRWhsPP1AGfueDG8")}
            >
              <Text
                variant="bodyLarge"
                style={{ textDecorationLine: "underline"}}
              >
                5-2-9 Higashigotanda, Shinagawa Ward, Tokyo 141-0022
              </Text>
            </TouchableOpacity>
      
            <TouchableOpacity onPress={() => openPhone("+810334414201")}>
              <Text
                variant="bodyLarge"
                style={{ textDecorationLine: "underline"}}
              >
                +81-03-3441-4201
              </Text>
            </TouchableOpacity>

            <Text variant="bodyLarge">info@kbritokyo.jp</Text>
          </View>

          <View style={{ marginBottom: 24 }}>
            <Text variant="titleLarge">KJRI Osaka</Text>
            <Text variant="titleMedium">Konsulat Jenderal Republik Indonesia</Text>

            <TouchableOpacity
              onPress={() => Linking.openURL("https://maps.app.goo.gl/s1mcZmLGYMmzQ9E86")}
            >
              <Text
                variant="bodyLarge"
                style={{ textDecorationLine: "underline"}}
              >
                Nakanoshima Intes Building 22 F, 6-2-40, Nakanoshima Kita-ku Osaka 530-0005
              </Text>
            </TouchableOpacity>
      
            <TouchableOpacity onPress={() => openPhone("81664499898")}>
              <Text
                variant="bodyLarge"
                style={{ textDecorationLine: "underline"}}
              >
                (81-6) 6449-9898
              </Text>
            </TouchableOpacity>

            <Text variant="bodyLarge">osaka.kjri@kemlu.go.id</Text>
          </View>

          {/* <View style={{ marginBottom: 24 }}>
            <Text variant="titleLarge">KJRI di Osaka</Text>
            <Text>Konsulat Jenderal Republik Indonesia</Text>
            <Text>Nakanoshima Intes Building 22 F, 6-2-40, Nakanoshima Kita-ku Osaka 530-0005</Text>
            <Text>(81-6) 6449-9898</Text>
            <Text>(81-6) 6449-9883</Text>
            <Text>kjri-osaka@indonesia-osaka.org</Text>
            <Text>osaka.kjri@kemlu.go.id</Text>
            <Text>consular@indonesia-osaka.org</Text>
          </View> */}

          <View style={{ marginBottom: 36 }}>
            <Text variant="titleMedium" >Japan Emergency Contact Numbers</Text>

            <View style={{ flexDirection: "row" }}>
              <View style={{ flex: 1, padding: 12 }}>
                <Button onPress={() => openPhone("119")}>
                  <Text
                    variant="titleLarge"
                    style={{ textAlign: "center", textDecorationLine: "underline" }}
                  >
                    119
                  </Text>
                </Button>
                <TouchableOpacity onPress={() => openPhone("110")}>
                  <Text style={{ textAlign: "center" }}>
                    Fire/Ambulance
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={{ flex: 1, padding: 12 }}>
                <Button onPress={() => openPhone("110")}>
                  <Text
                    variant="titleLarge"
                    style={{ textAlign: "center", textDecorationLine: "underline" }}
                  >
                    110
                  </Text>
                </Button>
                <TouchableOpacity onPress={() => openPhone("110")}>
                  <Text style={{ textAlign: "center" }}>
                    Police
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={{ marginBottom: 24 }}>
            <Text variant="titleLarge">KJRI Hong Kong</Text>
            <Text variant="titleMedium">Konsulat Jenderal Republik Indonesia</Text>

            <TouchableOpacity
              onPress={() => Linking.openURL("https://maps.app.goo.gl/kcqKMXmrEPzHGtoM9")}
            >
              <Text
                variant="bodyLarge"
                style={{ textDecorationLine: "underline"}}
              >
                127-129 Leighton Road, 6-8 Keswick Street, Causeway Bay Hong Kong, P. R. Tiongkok
              </Text>
            </TouchableOpacity>
      
            <TouchableOpacity onPress={() => openPhone("85236510200")}>
              <Text
                variant="bodyLarge"
                style={{ textDecorationLine: "underline"}}
              >
                (852) 3651 0200
              </Text>
            </TouchableOpacity>

            <Text variant="bodyLarge">indonesian-cg@cgrihk.com</Text>
          </View>

          <View style={{ marginBottom: 24 }}>
            <Text variant="titleMedium" >Hong Kong Emergency Contact Numbers</Text>

            <View style={{ flexDirection: "row" }}>
              <View style={{ flex: 1, padding: 12 }}>
                <Button mode="text" onPress={() => openPhone("999")} style={{ flexDirection: "column"}}>
                  <Text
                    variant="titleLarge"
                    style={{ textDecorationLine: "underline" }}
                  >
                    999
                  </Text>
                </Button>
                <TouchableOpacity onPress={() => openPhone("999")}>
                  <Text style={{ textAlign: "center" }}>
                    Fire/Police/Ambulance
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={{ flex: 1, padding: 12 }}>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
