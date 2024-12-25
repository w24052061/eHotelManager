// AdminCancelRequests.tsx

import React, { useState, useEffect } from "react";
import {
  View,
  FlatList,
  ActivityIndicator,
  Text,
  StyleSheet,
  Alert,
} from "react-native";
import {
  ref,
  get,
  query,
  orderByChild,
  equalTo,
  update,
} from "firebase/database";
import { database } from "@firebaseConfig";
import CancelRequestCard from "./CancelRequestCard";
import { Booking } from "@/components/model/Booking";

const AdminCancelRequests: React.FC = () => {
  const [cancelRequests, setCancelRequests] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCancelRequests();
  }, []);

  const fetchCancelRequests = async () => {
    try {
      setLoading(true);
      const bookingsRef = ref(database, "bookings");
      const snapshot = await get(bookingsRef);
      if (snapshot.exists()) {
        const bookingsData = snapshot.val();
        const today = new Date().toISOString().split("T")[0];
        const filteredBookings: Booking[] = Object.keys(bookingsData)
          .map((key) => ({
            id: key,
            ...bookingsData[key],
          }))
          .filter((booking: Booking) => {
            const status = booking.status;
            const toDate = booking.toDate;
            return (
              (status === "cancel-pending" || status === "cancel-accepted") &&
              toDate >= today
            );
          });
        setCancelRequests(filteredBookings);
      } else {
        setCancelRequests([]);
      }
    } catch (error) {
      console.error("Error fetching cancel requests:", error);
      Alert.alert("Error", "Failed to fetch cancel requests.");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (bookingId: string, newStatus: string) => {
    try {
      const bookingRef = ref(database, `bookings/${bookingId}`);
      await update(bookingRef, { status: newStatus });
      // Refresh the list after update
      fetchCancelRequests();
    } catch (error) {
      console.error("Error updating status:", error);
      Alert.alert("Error", "Failed to update booking status.");
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (cancelRequests.length === 0) {
    return <Text style={styles.noRequests}>No cancel requests found.</Text>;
  }

  return (
    <FlatList
      data={cancelRequests}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <CancelRequestCard
          booking={item}
          onAccept={() => handleStatusUpdate(item.id, "cancel-accepted")}
          onReject={() => handleStatusUpdate(item.id, "cancel-rejected")}
        />
      )}
      contentContainerStyle={styles.listContainer}
    />
  );
};

export default AdminCancelRequests;

const styles = StyleSheet.create({
  listContainer: {
    padding: 16,
  },
  noRequests: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 20,
    color: "#888",
  },
});
