// app/(auth)/forgot-password.tsx
import React from "react";
import ForgotPassword from "@/screens/auth/ForgotPasswordScreen";
import { StyleSheet, View } from "react-native";
import HamburgerMenu from "@/components/HamburgerMenu";

const ForgotPasswordScreen = () => {
  return (
    <View style={styles.mainContainer}>
      <HamburgerMenu />
      <ForgotPassword />
    </View>
  );
};

export default ForgotPasswordScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#25292e",
  },
});
