import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import ButtonComponent from "@/components/ButtonComponent";
import HamburgerMenu from "@/components/HamburgerMenu";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@firebaseConfig";
import RoomComponent from "@/components/RoomManagement/RoomComponent";

const HomePage_Screen = () => {
  const router = useRouter();

  return (
    <View style={styles.safeArea}>
      <HamburgerMenu />

      <Text style={styles.title}>Available Rooms</Text>

      <RoomComponent />
    </View>
  );
};

export default HomePage_Screen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#25292e",
  },
  title: {
    fontSize: 24,
    color: "white",
    fontWeight: "bold",
    padding: 16,
    textAlign: "center",
  },
  buttonLogin: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    paddingLeft: 20,
    paddingTop: 20,
  },
});
