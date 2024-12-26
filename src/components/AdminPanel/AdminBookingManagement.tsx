// AdminBookingManagement.tsx

import React, { useState, useEffect } from "react";
import {
  View,
  FlatList,
  ActivityIndicator,
  Text,
  StyleSheet,
  Alert,
} from "react-native";
import { ref, get, remove, update } from "firebase/database";
import { database } from "@firebaseConfig";
import BookingCard from "./BookingCard";
import { Booking, User } from "@/components/model/BookedRoom";

const AdminBookingManagement: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [usersMap, setUsersMap] = useState<{ [key: string]: User }>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookingsAndUsers();
  }, []);

  const fetchBookingsAndUsers = async () => {
    try {
      setLoading(true);

      // Fetch Bookings
      const bookingsRef = ref(database, "bookings");
      const bookingsSnapshot = await get(bookingsRef);
      let fetchedBookings: Booking[] = [];

      if (bookingsSnapshot.exists()) {
        const bookingsData = bookingsSnapshot.val();
        fetchedBookings = Object.keys(bookingsData).map((key) => ({
          id: key,
          roomId: bookingsData[key].roomId,
          userId: bookingsData[key].userId,
          fromDate: bookingsData[key].fromDate,
          toDate: bookingsData[key].toDate,
          email: bookingsData[key].email,
          status: bookingsData[key].status || "",
          createdAt: bookingsData[key].createdAt,
          cancelRequestedAt: bookingsData[key].cancelRequestedAt,
        }));
      }

      // Sort Bookings by createdAt descending
      fetchedBookings.sort((a, b) => b.createdAt - a.createdAt);

      // Fetch Users
      const usersRef = ref(database, "users");
      const usersSnapshot = await get(usersRef);
      let fetchedUsers: User[] = [];

      if (usersSnapshot.exists()) {
        const usersData = usersSnapshot.val();
        fetchedUsers = Object.keys(usersData).map((key) => ({
          id: key,
          name: usersData[key].name,
          surname: usersData[key].surname,
          email: usersData[key].email,
          mobile: usersData[key].mobile,
          gender: usersData[key].gender,
          role: usersData[key].role,
          createdAt: usersData[key].createdAt,
        }));
      }

      // Create a map for easy lookup
      const usersMapTemp: { [key: string]: User } = {};
      fetchedUsers.forEach((user) => {
        usersMapTemp[user.id] = user;
      });

      setUsersMap(usersMapTemp);
      setBookings(fetchedBookings);
    } catch (error) {
      console.error("Error fetching bookings or users:", error);
      Alert.alert("Error", "Failed to fetch bookings or user data.");
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveBooking = async (bookingId: string) => {
    try {
      await remove(ref(database, `bookings/${bookingId}`));
      Alert.alert("Success", "Booking removed successfully.");
      // Refresh bookings
      fetchBookingsAndUsers();
    } catch (error) {
      console.error("Error removing booking:", error);
      Alert.alert("Error", "Failed to remove booking.");
    }
  };

  const handleUpdateBooking = async (
    bookingId: string,
    updatedFields: Partial<Booking>
  ) => {
    try {
      await update(ref(database, `bookings/${bookingId}`), updatedFields);
      Alert.alert("Success", "Booking updated successfully.");
      // Refresh bookings
      fetchBookingsAndUsers();
    } catch (error) {
      console.error("Error updating booking:", error);
      Alert.alert("Error", "Failed to update booking.");
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (bookings.length === 0) {
    return (
      <View style={styles.center}>
        <Text>No bookings found.</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={bookings}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <BookingCard
          booking={item}
          user={usersMap[item.userId]}
          onRemove={() => handleRemoveBooking(item.id)}
          onUpdate={(updatedFields) =>
            handleUpdateBooking(item.id, updatedFields)
          }
        />
      )}
      contentContainerStyle={styles.listContainer}
    />
  );
};

export default AdminBookingManagement;

const styles = StyleSheet.create({
  listContainer: {
    padding: 16,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
