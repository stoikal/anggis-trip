import React from 'react';
import { Tabs } from 'expo-router';
import { IconSymbol } from '@/components/ui/IconSymbol';
import COLORS from '@/constants/colors';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.TOKYO
      }}
    >
      <Tabs.Screen
        name="(agenda)"
        options={{
          title: 'Today',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="calendar" color={color} />,
        }}
      />

      <Tabs.Screen
        name="(budget)"
        options={{
          title: 'Budget',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="yensign.circle" color={color} />,
        }}
      />

      <Tabs.Screen
        name="phrases"
        options={{
          title: 'Phrases',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="captions.bubble" color={color} />,
        }}
      />

      <Tabs.Screen
        name="info"
        options={{
          title: 'Info',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="info.circle" color={color} />,
        }}
      />

      <Tabs.Screen
        name="time"
        options={{
          title: "Time",
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="clock" color={color} />,
        }}
      />
      {/* TODO NOTES */}
    </Tabs>
  );
}
