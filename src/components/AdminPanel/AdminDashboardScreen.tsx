import React, { useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  ActivityIndicator,
  Text,
} from "react-native";
import RoomComponent from "@/components/RoomManagement/RoomComponent";
import HamburgerMenu from "@/components/HamburgerMenu";
import useCheckUserRole from "@/components/CheckUserRole";
import { useRouter } from "expo-router";

export default function App() {
  const router = useRouter();
  const role = useCheckUserRole();

  useEffect(() => {
    if (role !== "loading" && role === "") {
      router.replace("/Login");
    }
  }, [role, router]);

  if (role === "loading") {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#fff" />
        <Text style={styles.loadingText}>Checking user status...</Text>
      </View>
    );
  }

  if (role === "" || role === "staff") {
    router.replace("/Dashboard");
  }

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
  loadingContainer: {
    flex: 1,
    backgroundColor: "#25292e",
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    color: "#fff",
    marginTop: 10,
  },
});
