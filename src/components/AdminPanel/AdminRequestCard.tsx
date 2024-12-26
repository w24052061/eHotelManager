import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { AdminRequest } from "@/components/model/AdminRequest";
import AccessLimit from "@/components/AccessLimitComponent";

interface AdminRequestCardProps {
  request: AdminRequest;
  onAccept: () => void;
  onReject: () => void;
}

const AdminRequestCard: React.FC<AdminRequestCardProps> = ({
  request,
  onAccept,
  onReject,
}) => {
  const { type, status, roomId, fromDate, toDate, bookingId, serviceId } =
    request;

  const handleReject = () => {
    Alert.alert(
      "Confirm Reject",
      "Are you sure you want to reject this request?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "OK", onPress: onReject },
      ]
    );
  };

  if (type === "cancel" && status === "cancel-accepted") {
    return (
      <View style={[styles.card, styles.acceptedCard]}>
        <Text style={styles.cardTitle}>Cancellation Request</Text>
        <Text>Room ID: {roomId}</Text>
        <Text>From: {fromDate}</Text>
        <Text>To: {toDate}</Text>
        <Text>Status: {status}</Text>
      </View>
    );
  }

  if (type === "cancel" && status === "cancel-pending") {
    return (
      <View style={styles.CancellationCard}>
        <Text style={styles.cardTitle}>Cancellation Request</Text>
        <Text>Room ID: {roomId}</Text>
        <Text>From: {fromDate}</Text>
        <Text>To: {toDate}</Text>
        <Text>Status: {status}</Text>
        <AccessLimit
          allowedRoles={["admin"]}
          render={
            <>
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.acceptButton}
                  onPress={onAccept}
                >
                  <Text style={styles.buttonText}>Accept</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.rejectButton}
                  onPress={handleReject}
                >
                  <Text style={styles.buttonText}>Reject</Text>
                </TouchableOpacity>
              </View>
            </>
          }
        />
      </View>
    );
  }

  if (type === "service" && status === "accepted") {
    return (
      <View style={[styles.card, styles.acceptedCard]}>
        <Text style={styles.cardTitle}>Service Request</Text>
        <Text>Room ID: {roomId}</Text>
        <Text>Booking ID: {bookingId}</Text>
        <Text>Service ID: {serviceId}</Text>
        <Text>Status: {status}</Text>
      </View>
    );
  }

  if (type === "service" && status === "pending") {
    return (
      <View style={styles.ServiceCard}>
        <Text style={styles.cardTitle}>Service Request</Text>
        <Text>Room ID: {roomId}</Text>
        <Text>Booking ID: {bookingId}</Text>
        <Text>Service ID: {serviceId}</Text>
        <Text>Status: {status}</Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.acceptButton} onPress={onAccept}>
            <Text style={styles.buttonText}>Accept</Text>
          </TouchableOpacity>

          <AccessLimit
            allowedRoles={["admin"]}
            render={
              <TouchableOpacity
                style={styles.rejectButton}
                onPress={handleReject}
              >
                <Text style={styles.buttonText}>Reject</Text>
              </TouchableOpacity>
            }
          />
        </View>
      </View>
    );
  }

  // For any other status or type, render nothing
  return null;
};

export default AdminRequestCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "green",
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  CancellationCard: {
    backgroundColor: "orange",
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  ServiceCard: {
    backgroundColor: "lightblue",
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  acceptedCard: {
    backgroundColor: "#d4edda", // Green background for accepted requests
    borderColor: "#c3e6cb",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center",
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
