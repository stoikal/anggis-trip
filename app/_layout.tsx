import { DayExpensesProvider } from '@/contexts/dayExpenses';
import { migrateDbIfNeeded } from '@/db/db';
import { Stack } from 'expo-router';
import { SQLiteProvider, useSQLiteContext, type SQLiteDatabase } from 'expo-sqlite';
import React from 'react';
import {
  StatusBar
} from 'react-native';
import { MD3LightTheme as DefaultTheme, PaperProvider } from 'react-native-paper';
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
    <SQLiteProvider databaseName="test.db" onInit={migrateDbIfNeeded}>
      <DayExpensesProvider>
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
      </DayExpensesProvider>
    </SQLiteProvider>
  );
}
