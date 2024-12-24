import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Platform,
} from "react-native";
import { router } from "expo-router";
import { onAuthStateChanged } from "firebase/auth";
import { ref, get } from "firebase/database";
import { auth, database } from "@firebaseConfig";
import HamburgerMenu from "@/components/HamburgerMenu";
import { BookedRooms } from "@/components/Dashboard/BookedRooms";

const DashboardScreen = () => {
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const userRef = ref(database, `users/${currentUser.uid}`);

        try {
          const snapshot = await get(userRef);

          if (snapshot.exists()) {
            const data = snapshot.val();
            // Use 'name' from database if it exists, otherwise fallback to email before '@'
            const name = data.name || currentUser.email.split("@")[0];
            setUserName(name);
          } else {
            // If no data in the database, fallback to email before '@'
            const fallbackName = currentUser.email.split("@")[0];
            setUserName(fallbackName);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          // Fallback in case of error
          const fallbackName = currentUser.email.split("@")[0];
          setUserName(fallbackName);
        }
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
      <View style={{ flex: 1 }}>
        <BookedRooms />
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
