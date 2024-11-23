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
      <Stack.Screen name="[date]" />
    </Stack>
  );
}
