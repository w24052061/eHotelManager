// app/(tabs)/_layout.tsx
import { Tabs } from "expo-router";
import React from "react";
// Import icons from @expo/vector-icons
import { Feather, Ionicons } from "@expo/vector-icons";

export default function AdminLayout() {
  return (
    <Tabs>
      {/* Tab 1: Admin Dashboard */}
      <Tabs.Screen
        name="AdminDashboardRoomsTab"
        options={{
          title: "Manage Rooms",
          tabBarIcon: ({ focused, color, size }) => (
            // for example, using Feather bed icon
            <Feather
              name="key"
              size={size}
              color={focused ? "#4a4e69" : color}
            />
          ),
        }}
      />
      {/* Tab 2: Complaints */}
      <Tabs.Screen
        name="AdminDashboardComplaintsTab"
        options={{
          title: "Manage Complaints",
          tabBarIcon: ({ focused, color, size }) => (
            // using Ionicons clipboard icon
            <Ionicons
              name="clipboard"
              size={size}
              color={focused ? "#4a4e69" : color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
