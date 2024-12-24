// BookedRooms.tsx
import React, { useEffect, useState } from "react";
import { View, Text, FlatList, ActivityIndicator } from "react-native";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db, auth } from "@firebaseConfig";
import BookedRoomCard from "./BookedRoomCard";

export default function BookedRooms() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserBookings();
  }, []);

  async function fetchUserBookings() {
    try {
      setLoading(true);
      const q = query(
        collection(db, "bookings"),
        where("userId", "==", auth.currentUser.uid) // filter by current user
      );
      const querySnapshot = await getDocs(q);
      const bookingList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setBookings(bookingList);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <ActivityIndicator size="large" color="#000" />;
  }

  if (bookings.length === 0) {
    return <Text>No bookings found.</Text>;
  }

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={bookings}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <BookedRoomCard booking={item} />}
      />
    </View>
  );
}
