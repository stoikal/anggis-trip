import React from 'react';
import { Stack } from 'expo-router';

export default function AgendaLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="calendar" />
      <Stack.Screen name="expenses/[date]" />
    </Stack>
  );
}
