import React from "react";
import { View, StyleSheet } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import AdminCancelRequests from "@/components/AdminPanel/AdminCancelRequests";
import HamburgerMenu from "@/components/HamburgerMenu";

export default function AdminDashboardIndex() {
  return (
    <PaperProvider>
      <View style={styles.container}>
        <HamburgerMenu />
        <AdminCancelRequests />
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
});
