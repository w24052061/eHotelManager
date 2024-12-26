import React from "react";
import { View, StyleSheet, Text, ActivityIndicator } from "react-native";
import useCheckUserRole from "@/components/CheckUserRole";

interface AccessLimitProps {
  allowedRoles: ("admin" | "staff" | "user" | "logged-in")[]; // Roles allowed to access
  render: React.ReactNode; // Content to render when access is granted
}

const AccessLimit: React.FC<AccessLimitProps> = ({ allowedRoles, render }) => {
  const role = useCheckUserRole();

  if (role === "loading") {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4A4E69" />
        <Text>Loading...</Text>
      </View>
    );
  }

  // Restrict access if role is not allowed
  if (
    (allowedRoles.includes("logged-in") && !role) || // Allow logged-in users
    (!allowedRoles.includes("logged-in") && !allowedRoles.includes(role)) // Role mismatch
  ) {
    return (
      <View style={styles.accessDeniedContainer}>
        <Text style={styles.accessDeniedText}>
          Access Denied: Authorized roles only.
        </Text>
      </View>
    );
  }

  // Render the content when access is granted
  return <>{render}</>;
};

export default AccessLimit;

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  accessDeniedContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  accessDeniedText: {
    color: "red",
    fontSize: 18,
    fontWeight: "bold",
  },
});

// ________________________Usage Examples________________________

//------------------- Admin access only -------------------
// <AccessLimit
//   allowedRoles={["admin"]}
//   render={<AdminDashboard />}
// />

//------------------- Staff access only -------------------
// <AccessLimit
//   allowedRoles={["staff"]}
//   render={<StaffDashboard />}

//------------------- Content for Admins and Staff-------------------
// <AccessLimit
//   allowedRoles={["admin", "staff"]}
//   render={<SharedContent />}
// />

//------------------- Logged-In Users -------------------
// <AccessLimit
//   allowedRoles={["logged-in"]}
//   render={<LoggedInContent />}
// />
