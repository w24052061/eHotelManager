import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import RoomComponent from "@/components/RoomManagement/RoomComponent";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <RoomComponent />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
