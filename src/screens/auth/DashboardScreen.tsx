import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { router } from "expo-router";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "@firebaseConfig";
import HamburgerMenu from "@/components/HamburgerMenu";

const DashboardScreen = () => {
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        const name = currentUser.displayName || currentUser.email.split("@")[0];
        setUserName(name);
      } else {
        router.replace("/Login");
      }
    });

    return () => unsubscribe();
  }, []);

  if (userName === null) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <View style={styles.mainContainer}>
      <HamburgerMenu />
      <View style={styles.subContainer}>
        <Text style={styles.title}>Welcome, {userName}!</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  subContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,
    justifyContent: "center",
    alignSelf: "center",
  },
});

export default DashboardScreen;
