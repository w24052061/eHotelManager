// app/(auth)/AdminDashboard.tsx (redirect file)
import React, { useEffect } from "react";
import { View, Text } from "react-native";
import { useRouter } from "expo-router";

export default function AdminDashboard() {
  const router = useRouter();

  useEffect(() => {
    // When this screen mounts, jump to our admin tabs route
    router.replace("/(tabs)/AdminDashboardBookingsTab");
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Redirecting to Admin Dashboard Tabs...</Text>
    </View>
  );
}
