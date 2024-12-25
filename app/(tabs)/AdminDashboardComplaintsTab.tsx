import React from "react";
import { View, StyleSheet } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import ComplaintsPage from "@/components/AdminPanel/ComplaintsPage";
import HamburgerMenu from "@/components/HamburgerMenu";

export default function AdminDashboardIndex() {
  return (
    <PaperProvider>
      <View style={styles.container}>
        <HamburgerMenu />
        <ComplaintsPage />
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
});
