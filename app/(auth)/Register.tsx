import React from "react";
import RegisterScreen from "@/screens/auth/RegisterScreen";
import { StyleSheet, View } from "react-native";
import HamburgerMenu from "@/components/HamburgerMenu";

const RegisterTab = () => {
  return (
    <View style={styles.mainContainer}>
      <HamburgerMenu />
      <RegisterScreen />
    </View>
  );
};

export default RegisterTab;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#25292e",
  },
});
