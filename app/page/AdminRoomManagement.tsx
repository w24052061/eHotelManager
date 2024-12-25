import React from "react";
import { View, StyleSheet } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import AdminDashboard from "@/components/AdminPanel/AdminDashboard";
import HamburgerMenu from "@/components/HamburgerMenu";

export default function AdminDashboardIndex() {
  return (
    <View style={styles.container}>
      <HamburgerMenu />
      <PaperProvider>
        <AdminDashboard />
      </PaperProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
});
