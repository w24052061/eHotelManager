import React from "react";
import { View, StyleSheet } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import AdminBookingManagement from "@/components/AdminPanel/AdminBookingManagement";
import HamburgerMenu from "@/components/HamburgerMenu";

export default function AdminDashboardBookingsTab() {
  return (
    <View style={styles.container}>
      <HamburgerMenu />
      <PaperProvider>
        <AdminBookingManagement />
      </PaperProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
});
