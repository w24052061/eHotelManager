import React from "react";
import { View, Text, StyleSheet } from "react-native";
import HamburgerMenu from "@/components/HamburgerMenu";
import RoomComponent from "@/components/RoomManagement/RoomComponent";

export default function HomePage_Screen() {
  return (
    <View style={{ flex: 1, backgroundColor: "#f5f5f5" }}>
      <HamburgerMenu />
      <Text
        style={{
          fontSize: 24,
          color: "#4A4E69",
          fontWeight: "bold",
          textAlign: "center",
          backgroundColor: "#f5f5f5",
        }}
      >
        Available Rooms
      </Text>
      <RoomComponent />
    </View>
  );
}
