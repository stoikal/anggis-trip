import { Stack } from 'expo-router';
import {
  StatusBar,
  AppRegistry
} from 'react-native';
import { PaperProvider, MD3LightTheme as DefaultTheme } from 'react-native-paper';
// import { name as appName } from '../app.json';

const theme = {
  ...DefaultTheme,
  // Specify custom property
  myOwnProperty: true,
  // Specify custom property in nested object
  colors: {
    ...DefaultTheme.colors,
  },
};

export default function RootLayout() {
  return (
    <PaperProvider theme={theme}>
      <StatusBar barStyle="dark-content" backgroundColor={theme.colors.background} />
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="(tabs)" />
      </Stack>
    </PaperProvider>
  );
}
