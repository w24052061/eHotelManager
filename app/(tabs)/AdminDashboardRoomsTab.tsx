// app/(auth)/admin/index.tsx
import React from "react";
import { View, StyleSheet } from "react-native";
import AdminDashboardScreen from "@/components/AdminPanel/AdminDashboardScreen";

export default function AdminDashboardIndex() {
  return (
    <View style={styles.container}>
      <AdminDashboardScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
});
