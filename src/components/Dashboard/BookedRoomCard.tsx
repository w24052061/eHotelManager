import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import RequestServiceButton from "./RequestServiceButton";
import ComplaintModal from "./ComplaintModal";
import CancelButton from "./CancelButton";

export default BookedRoomCard = ({ booking }) => {
  const [showComplaintModal, setShowComplaintModal] = useState(false);

  return (
    <View style={styles.card}>
      <View style={styles.bookdetails}>
        <Text style={styles.cardTitle}>Room ID: {booking.roomId}</Text>
        <Text>From: {booking.fromDate}</Text>
        <Text>To: {booking.toDate}</Text>
        <Text>Status: {booking.status}</Text>
      </View>
      {/* Request Service Button */}
      <RequestServiceButton bookingId={booking.id} roomId={booking.roomId} />

      {/* Complaint Button */}
      <Text
        style={styles.complaintLink}
        onPress={() => setShowComplaintModal(true)}
      >
        COMPLAINT
      </Text>

      {/* Cancel Room Button */}
      <CancelButton bookingId={booking.id} />

      {/* Complaint Modal */}
      <ComplaintModal
        bookingId={booking.id}
        isVisible={showComplaintModal}
        onClose={() => setShowComplaintModal(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
    elevation: 2,
    borderWidth: 3,
    borderStyle: "dashed",
  },
  bookdetails: {
    marginBottom: 10,
    borderBottomWidth: 3,
    borderStyle: "dashed",
    paddingBottom: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  complaintLink: {
    color: "#ffffff",
    marginTop: 10,
    marginBottom: 10,
    textAlign: "center",
    padding: 7,
    borderRadius: 2,
    backgroundColor: "#4A4E69",
  },
});
