import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { ButtonComponentProps } from "@/components/model/Button";

// Define button colors
const BUTTON_COLORS = {
  primary: "#4CAF50", // Green
  secondary: "#007AFF", // Blue
  danger: "#FF0000", // Red
  default: "#CCCCCC", // Grey
};

const ButtonComponent: React.FC<ButtonComponentProps> = ({
  text,
  link,
  color = "primary",
  style,
  width = "100%",
}) => {
  const router = useRouter();

  const handlePress = () => {
    router.push(link); // Navigate to the link path
  };

  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: BUTTON_COLORS[color], width },
        style,
      ]} // Combine default and custom styles
      onPress={handlePress}
    >
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default ButtonComponent;
