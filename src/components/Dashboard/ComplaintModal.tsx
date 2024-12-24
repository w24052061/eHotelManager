import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
} from "react-native";
import { addComplaint } from "@/utils/firebaseUtils";
import { auth } from "@firebaseConfig";

type ComplaintModalProps = {
  bookingId: string;
  isVisible: boolean;
  onClose: () => void;
};

export default function ComplaintModal({
  bookingId,
  isVisible,
  onClose,
}: ComplaintModalProps) {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  async function submitComplaint() {
    if (!title.trim() || !message.trim()) {
      Alert.alert("Validation", "Please fill out title and message.");
      return;
    }

    try {
      await addComplaint({
        bookingId,
        userId: auth.currentUser?.uid,
        title,
        message,
      });
      Alert.alert("Complaint Submitted", "Your complaint has been recorded.");
      // Clear form and close modal
      setTitle("");
      setMessage("");
      onClose();
    } catch (err) {
      console.error(err);
      Alert.alert("Error", "Unable to submit complaint.");
    }
  }

  return (
    <Modal visible={isVisible} animationType="slide" transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.modalBox}>
          <Text style={styles.modalTitle}>Submit Complaint</Text>

          <TextInput
            style={styles.input}
            placeholder="Complaint Title"
            value={title}
            onChangeText={setTitle}
          />

          <TextInput
            style={[styles.input, { height: 80 }]}
            placeholder="Complaint Message"
            multiline
            value={message}
            onChangeText={setMessage}
          />

          <Button title="Submit" onPress={submitComplaint} />
          <Button title="Close" onPress={onClose} color="red" />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalBox: {
    width: "80%",
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 8,
    marginBottom: 10,
  },
});
