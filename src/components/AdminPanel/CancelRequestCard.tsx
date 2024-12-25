// CancelRequestCard.tsx

import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { Booking } from "@/components/model/Booking";

interface CancelRequestCardProps {
  booking: Booking;
  onAccept: () => void;
  onReject: () => void;
}

const CancelRequestCard: React.FC<CancelRequestCardProps> = ({
  booking,
  onAccept,
  onReject,
}) => {
  const { status } = booking;

  const handleDelete = () => {
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to reject this cancel request?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "OK", onPress: onReject },
      ]
    );
  };

  if (status === "cancel-accepted") {
    return (
      <View style={[styles.card, styles.acceptedCard]}>
        <Text style={styles.cardTitle}>Room ID: {booking.roomId}</Text>
        <Text>From: {booking.fromDate}</Text>
        <Text>To: {booking.toDate}</Text>
        <Text>Status: {status}</Text>
      </View>
    );
  }

  if (status === "cancel-pending") {
    return (
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Room ID: {booking.roomId}</Text>
        <Text>From: {booking.fromDate}</Text>
        <Text>To: {booking.toDate}</Text>
        <Text>Status: {status}</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.acceptButton} onPress={onAccept}>
            <Text style={styles.buttonText}>Accept</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.rejectButton} onPress={handleDelete}>
            <Text style={styles.buttonText}>Reject</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // For any other status, render nothing
  return null;
};

export default CancelRequestCard;

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
  acceptedCard: {
    backgroundColor: "#d4edda", // Green background
    borderColor: "#c3e6cb",
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
  acceptButton: {
    backgroundColor: "#28a745",
    padding: 10,
    borderRadius: 5,
    flex: 0.48,
    alignItems: "center",
  },
  rejectButton: {
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
});
