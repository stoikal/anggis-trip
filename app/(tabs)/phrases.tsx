import Phrase from '@/components/Phrase';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Appbar, Text } from 'react-native-paper';

export default function DetailsScreen() {
  return (
    <>
      <Appbar.Header>
        <Appbar.Content title="Phrases" />
      </Appbar.Header>
      <ScrollView style={styles.container}>
        <View style={{ marginBottom: 8 }}>
          <Text variant="titleLarge" style={{ marginBottom: 4}}>General</Text>

          <Phrase
            eng="Hello"
            jap="Konnichiwa"
          />

          <Phrase
            eng="Excuse me"
            jap="Sumimasen"
          />
          <Phrase
            eng="Thank you"
            jap="Arigatō Gozaimasu."
          />
          <Phrase
            eng="Please"
            jap="Kudasai."
          />
          <Phrase
            eng="Goodbye"
            jap="Sayōnara."
          />
          <Phrase
            eng="No, thank you"
            jap="Kekkō desu"
          />
          <Phrase
            eng="Help!"
            jap="Tasukete!"
          />
          <Phrase
            eng="Hospital"
            jap="Byōin"
          />
        </View>

        <View style={{ marginBottom: 8 }}>
          <Text variant="titleLarge" style={{ marginBottom: 4}}>Direction</Text>

          <Phrase
            eng="Where is the (bank)?"
            jap="(Ginkō) wa doko desu ka."
          />
          <Phrase
            eng="Which train?"
            jap="Dono Densha."
          />
        </View>

        <View style={{ marginBottom: 8 }}>
          <Text variant="titleLarge" style={{ marginBottom: 4}}>Restaurant</Text>
          <Phrase
            eng="Do you have an english menu?"
            jap="Eigo no menyu wa arimasuka."
          />

          <Phrase
            eng="I'd like a (something), please."
            jap="(Something) wo kudasai."
          />

          <Phrase
            eng="(One) (coffee), please."
            jap="(Kōhī) wo (hitotsu) kudasai."
          />

          <Phrase
            eng="How much for the (coffee)?"
            jap="(Kōhī) wa ikura desu ka."
          />

          <Phrase
            eng="(order chef’s recommendation)"
            jap="Omakase de"
          />

          <Phrase
            eng="Water, please"
            jap="O-mizu o onegaishimasu"
          />
          <Phrase
            eng="Check, please"
            jap="Okaikei onegaishimasu"
          />
          <Phrase
            eng="Delicious"
            jap="Oishī desu"
          />
        </View>

        <View style={{ marginBottom: 8 }}>
          <Text variant="titleLarge" style={{ marginBottom: 4}}>Shopping</Text>

          <Phrase
            eng="What is this?"
            jap="Kore wa nan desu ka."
          />

          <Phrase
            eng="How much is this?"
            jap="Ikura desu ka."
          />

          <Phrase
            eng="I'll take it"
            jap="Sore o moraimasu"
          />
        </View>

        <View style={{ marginBottom: 8 }}>
          <Text variant="titleLarge" style={{ marginBottom: 4}}>Amount</Text>

          <Phrase
            eng="one two three four five"
            jap="hitotsu futatsu mittsu yottsu itsutsu"
          />

          <Phrase
            eng="six seven eight nine ten"
            jap="mutsu nanatsu yattsu kokonotsu too"
          />
        </View>

        <View style={{ marginBottom: 48 }}></View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingBottom: 32
  },
});
