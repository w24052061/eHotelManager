import { StyleSheet, Text, View } from "react-native";
import React from "react";
import HamburgerMenu from "@/components/HamburgerMenu";
import AdminUserManagement from "@/components/AdminPanel/AdminUserManagement";
import AccessLimit from "@/components/AccessLimitComponent";

const ManageStaff = () => {
  return (
    <View style={styles.mainContainer}>
      <HamburgerMenu />
      <AccessLimit allowedRoles={["admin"]} render={<AdminUserManagement />} />
    </View>
  );
};

export default ManageStaff;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#f1f1f1",
  },
});
