import React, { useState } from "react";
import { View, TextInput, Button, Alert, StyleSheet } from "react-native";
import { submitComplaint } from "@firebaseConfig";

const ComplaintPage = () => {
  const [complaint, setComplaint] = useState("");

  const handleComplaintSubmit = async () => {
    if (complaint.trim() === "") {
      Alert.alert("Error", "Please enter a complaint.");
      return;
    }

    try {
      await submitComplaint(complaint);
      Alert.alert("Success", "Complaint submitted successfully.");
      setComplaint("");
    } catch (error) {
      Alert.alert("Error", "Failed to submit complaint. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter your complaint"
        value={complaint}
        onChangeText={setComplaint}
      />
      <Button title="Submit Complaint" onPress={handleComplaintSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
});

export default ComplaintPage;
