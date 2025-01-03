import React from "react";
import { View, StyleSheet } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import AdminDashboard from "@/components/AdminPanel/AdminDashboard";
import HamburgerMenu from "@/components/HamburgerMenu";
import AccessLimit from "@/components/AccessLimitComponent";

export default function AdminDashboardIndex() {
  return (
    <View style={styles.container}>
      <HamburgerMenu />
      <PaperProvider>
        <AccessLimit allowedRoles={["admin"]} render={<AdminDashboard />} />
      </PaperProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
});
