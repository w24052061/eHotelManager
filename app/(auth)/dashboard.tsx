import React, { useEffect } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import useCheckUserRole from "@/components/CheckUserRole";
import DashboardScreen from "@/screens/auth/DashboardScreen";
import AdminDashboard from "./AdminDashboard"; // Ensure path is correct

export default function DashboardTab() {
  const router = useRouter();
  const role = useCheckUserRole();

  // If the user is not logged in (role === ""), redirect to Home
  useEffect(() => {
    if (role !== "loading" && role === "") {
      router.replace("/");
    }
  }, [role, router]);

  // Show a loading state while checking user role
  if (role === "loading") {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#fff" />
        <Text style={styles.loadingText}>Checking role...</Text>
      </View>
    );
  }

  // If user is not logged in, we've triggered a redirect above
  // so return null to avoid rendering anything
  if (role === "") {
    return null;
  }

  // For a logged-in user:
  if (role === "admin") {
    return <AdminDashboard />;
  } else {
    // staff or user
    return <DashboardScreen />;
  }
}

const styles = {
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
};
