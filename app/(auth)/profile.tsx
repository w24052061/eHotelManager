import React, { useEffect } from "react";
import { StyleSheet, View, ActivityIndicator, Text } from "react-native";
import { useRouter } from "expo-router";
import useCheckUserRole from "@/components/CheckUserRole";
import HamburgerMenu from "@/components/HamburgerMenu";
import ProfileScreen from "@/screens/auth/ProfileScreen";

export default function ProfilePage() {
  const router = useRouter();
  const role = useCheckUserRole();

  // Distinguish states:
  // 1) role === "loading" => still fetching
  // 2) role === "" => user not logged in
  // 3) "admin" | "staff" | "user" => logged in

  useEffect(() => {
    if (role !== "loading" && role === "") {
      // Once we confirm the user isn't logged in,
      // do a navigation in a side effect
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

  if (role === "") {
    // We already triggered a redirect in the useEffect,
    // so just return null to avoid rendering anything
    return null;
  }

  // If role is "admin" / "staff" / "user", user is logged in
  return (
    <View style={styles.mainContainer}>
      <HamburgerMenu />
      <ProfileScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#25292e",
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
