// app/(tabs)/_layout.tsx
import { Tabs } from "expo-router";
import React from "react";
// Import icons from @expo/vector-icons
import { Feather, Ionicons } from "@expo/vector-icons";

export default function AdminLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          height: 50, // Set height to 50px
          backgroundColor: "#fff", // Optional: set a background color
        },
        tabBarLabelStyle: {
          fontSize: 12, // Optional: adjust the label font size
        },
        tabBarIconStyle: {
          marginBottom: -5, // Optional: adjust icon alignment
        },
      }}
    >
      {/* Tab 1: Admin Dashboard */}
      <Tabs.Screen
        name="AdminDashboardBookingsTab"
        options={{
          title: "Bookings",
          tabBarIcon: ({ focused, color, size }) => (
            <Feather
              name="bookmark"
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
          title: "Complaints",
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name="clipboard"
              size={size}
              color={focused ? "#4a4e69" : color}
            />
          ),
        }}
      />
      {/* Tab 3: Cancel Requests */}
      <Tabs.Screen
        name="AdminDashboardCancelRequestTab"
        options={{
          title: "Requests",
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name="chatbubble-ellipses-outline"
              size={size}
              color={focused ? "#4a4e69" : color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
