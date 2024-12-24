import React, { useState, useEffect } from "react";
import {
  View,
  FlatList,
  ActivityIndicator,
  Text,
  StyleSheet,
} from "react-native";
import { ref, get, query, orderByChild, equalTo } from "firebase/database";
import { auth, database } from "@firebaseConfig";
import BookedRoomCard from "./BookedRoomCard";

export const BookedRooms = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserBookings();
  }, []);

  const fetchUserBookings = async () => {
    try {
      setLoading(true);
      const userId = auth.currentUser?.uid;
      if (!userId) return;

      const bookingsRef = query(
        ref(database, "bookings"),
        orderByChild("userId"),
        equalTo(userId)
      );

      const snapshot = await get(bookingsRef);
      if (snapshot.exists()) {
        const bookingList = Object.keys(snapshot.val()).map((key) => ({
          id: key,
          ...snapshot.val()[key],
        }));
        setBookings(bookingList);
      } else {
        setBookings([]); // No bookings found
      }
    } catch (error) {
      console.error("Error fetching bookings:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#000" />;
  }

  if (bookings.length === 0) {
    return <Text style={styles.noBookings}>No bookings found.</Text>;
  }

  return (
    <FlatList
      data={bookings}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <BookedRoomCard booking={item} />}
    />
  );
};

const styles = StyleSheet.create({
  noBookings: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 20,
    color: "#888",
  },
});
