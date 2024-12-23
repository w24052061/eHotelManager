// app/(auth)/admin/complaints.tsx
import React from "react";
import { View, StyleSheet } from "react-native";
import AdminComplaintManagement from "@/components/AdminPanel/AdminComplaintManagement";

export default function AdminComplaintsTab() {
  return (
    <View style={styles.container}>
      <AdminComplaintManagement />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
});
