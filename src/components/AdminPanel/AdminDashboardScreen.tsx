import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import RoomComponent from "@/components/RoomManagement/RoomComponent";
import HamburgerMenu from "@/components/HamburgerMenu";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <HamburgerMenu />
      <RoomComponent />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
