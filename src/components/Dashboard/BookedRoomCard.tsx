import React, { useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import RequestServiceButton from "./RequestServiceButton";
import ComplaintModal from "./ComplaintModal";
import CancelButton from "./CancelButton";

export default function BookedRoomCard({ booking }) {
  const [showComplaintModal, setShowComplaintModal] = useState(false);

  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Room ID: {booking.roomId}</Text>
      <Text>From: {booking.fromDate}</Text>
      <Text>To: {booking.toDate}</Text>
      <Text>Status: {booking.status}</Text>

      {/* 1) Service Button */}
      <RequestServiceButton bookingId={booking.id} roomId={booking.roomId} />

      {/* 2) Complaint Button (opens modal) */}
      <Button title="Complaint" onPress={() => setShowComplaintModal(true)} />

      {/* 3) Cancel Button */}
      <CancelButton bookingId={booking.id} />

      {/* Complaint Modal */}
      <ComplaintModal
        bookingId={booking.id}
        isVisible={showComplaintModal}
        onClose={() => setShowComplaintModal(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    margin: 10,
    padding: 10,
    borderRadius: 8,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
