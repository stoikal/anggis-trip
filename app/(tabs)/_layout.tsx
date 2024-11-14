import { Tabs } from 'expo-router';
import { IconSymbol } from '@/components/ui/IconSymbol';

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="(agenda)"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="kamus"
        options={{
          title: 'Kamus',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="translate.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="kontak"
        options={{
          title: 'Kontak',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="contacts.fill" color={color} />,
        }}
      />
    </Tabs>
  );
}
