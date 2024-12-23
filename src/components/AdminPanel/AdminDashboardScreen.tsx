import React, { useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  ActivityIndicator,
  Text,
} from "react-native";
import { useRouter } from "expo-router";
import useCheckUserRole from "@/components/CheckUserRole";
import HamburgerMenu from "@/components/HamburgerMenu";
import RoomComponent from "@/components/RoomManagement/RoomComponent";

export default function App() {
  const router = useRouter();
  const role = useCheckUserRole();

  useEffect(() => {
    // Skip if still loading
    if (role === "loading") return;

    // role === "" => Not logged in
    if (role === "") {
      router.replace("/Login");
    }
    // role === "staff" => Go to dashboard
    else if (role === "staff") {
      router.replace("/Dashboard");
    }
    // If role === "admin" or "user", do nothing — let them see this page
  }, [role, router]);

  // While loading, show a spinner
  if (role === "loading") {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#fff" />
        <Text style={styles.loadingText}>Checking user status...</Text>
      </View>
    );
  }

  // By now, role is "admin", "user", or we triggered a redirect above
  // If the redirect is triggered, we'll quickly leave this screen
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
