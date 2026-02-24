import { Tabs } from "expo-router";
import { MaterialIcons } from '@expo/vector-icons';

export default function RootLayout() {
  return (
    <Tabs initialRouteName="trends">
      <Tabs.Screen
        name="expenses"
        options={{
          title: 'Expenses',
          tabBarIcon: ({ color, size }) => <MaterialIcons name="list" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="income"
        options={{
          title: 'Income',
          tabBarIcon: ({ color, size }) => <MaterialIcons name="attach-money" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="trends"
        options={{
          title: 'Trends',
          tabBarIcon: ({ color, size }) => <MaterialIcons name="trending-up" size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}