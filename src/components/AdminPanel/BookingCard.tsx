// BookingCard.tsx

import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  TextInput,
  Modal,
} from "react-native";
import { Booking, User } from "@/components/model/BookedRoom";
import { Picker as RNPicker } from "@react-native-picker/picker";

interface BookingCardProps {
  booking: Booking;
  user?: User;
  onRemove: () => void;
  onUpdate: (updatedFields: Partial<Booking>) => void;
}

const BookingCard: React.FC<BookingCardProps> = ({
  booking,
  user,
  onRemove,
  onUpdate,
}) => {
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [fromDate, setFromDate] = useState(booking.fromDate);
  const [toDate, setToDate] = useState(booking.toDate);
  const [status, setStatus] = useState<Booking["status"]>(booking.status);

  const handleSave = () => {
    // Validate dates
    if (new Date(fromDate) > new Date(toDate)) {
      Alert.alert("Error", "From Date cannot be after To Date.");
      return;
    }

    onUpdate({ fromDate, toDate, status });
    setIsEditModalVisible(false);
  };

  const confirmRemove = () => {
    Alert.alert(
      "Confirm Remove",
      "Are you sure you want to remove this booking?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "OK", onPress: onRemove },
      ]
    );
  };

  const statusOptions: Booking["status"][] = [
    "cancel-pending",
    "cancel-accepted",
    "cancel-rejected",
    "Available",
    "",
  ];

  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Room ID: {booking.roomId}</Text>
      <Text>
        User: {user ? `${user.name} ${user.surname}` : "Unknown User"}
      </Text>
      <Text>Email: {booking.email}</Text>
      <Text>From: {booking.fromDate}</Text>
      <Text>To: {booking.toDate}</Text>
      <Text>Status: {booking.status || "Available"}</Text>
      <Text>Booked At: {new Date(booking.createdAt).toLocaleString()}</Text>
      {booking.cancelRequestedAt && (
        <Text>
          Cancel Requested At:{" "}
          {new Date(booking.cancelRequestedAt).toLocaleString()}
        </Text>
      )}

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => setIsEditModalVisible(true)}
        >
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.removeButton} onPress={confirmRemove}>
          <Text style={styles.buttonText}>Remove</Text>
        </TouchableOpacity>
      </View>

      {/* Edit Modal */}
      <Modal
        visible={isEditModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsEditModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit Booking</Text>

            <TextInput
              style={styles.input}
              placeholder="From Date (YYYY-MM-DD)"
              value={fromDate}
              onChangeText={setFromDate}
            />
            <TextInput
              style={styles.input}
              placeholder="To Date (YYYY-MM-DD)"
              value={toDate}
              onChangeText={setToDate}
            />

            <Text style={styles.label}>Status:</Text>
            <RNPicker
              selectedValue={status}
              style={styles.picker}
              onValueChange={(itemValue) => setStatus(itemValue)}
            >
              {statusOptions.map((option) => (
                <RNPicker.Item
                  key={option}
                  label={option || "Available"}
                  value={option}
                />
              ))}
            </RNPicker>

            <View style={styles.modalButtonContainer}>
              <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                <Text style={styles.buttonText}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setIsEditModalVisible(false)}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default BookingCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 12,
    justifyContent: "space-between",
  },
  editButton: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
    flex: 0.48,
    alignItems: "center",
  },
  removeButton: {
    backgroundColor: "#dc3545",
    padding: 10,
    borderRadius: 5,
    flex: 0.48,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  // Modal Styles
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 8,
    padding: 16,
    alignItems: "stretch",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 8,
    marginBottom: 12,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  picker: {
    height: 50,
    width: "100%",
    marginBottom: 16,
  },
  modalButtonContainer: {
    flexDirection: "row",
    marginTop: 16,
    justifyContent: "space-between",
  },
  saveButton: {
    backgroundColor: "#28a745",
    padding: 10,
    borderRadius: 5,
    flex: 0.48,
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: "#6c757d",
    padding: 10,
    borderRadius: 5,
    flex: 0.48,
    alignItems: "center",
  },
});
