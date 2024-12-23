import React, { useEffect, useState } from "react";
import {
  View,
  SafeAreaView,
  Text,
  Image,
  StyleSheet,
  FlatList,
  ListRenderItem,
  ActivityIndicator,
} from "react-native";

import {
  getRooms,
  database,
  app,
  auth,
  signIn,
  signUp,
  resetPassword,
  signOut,
  getRoomById,
  bookRoom,
  getBookings,
  submitComplaint,
  getComplaints,
  updateComplaintStatus,
  updateRoomStatus,
} from "@firebaseConfig";
import { ref, get } from "firebase/database"; // Import Firebase methods
import { Room } from "@/components/model/Room";
import ButtonComponent from "@/components/ButtonComponent";
import useCheckUserRole from "@/components/CheckUserRole";
import { isRoomAvailable } from "@/components/RoomManagement/RoomAvailability";

const TespPage = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      setLoading(true);
      const roomsRef = ref(database, "rooms");
      const snapshot = await get(roomsRef);
      if (snapshot.exists()) {
        const fetchedRooms = Object.keys(snapshot.val()).map((key) => ({
          id: key,
          ...snapshot.val()[key],
        }));
        setRooms(fetchedRooms);
      } else {
        console.log("No rooms found in the database.");
        setRooms([]);
      }
    } catch (error) {
      console.error("Error fetching rooms:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#000" />
        <Text>Loading Rooms...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={rooms}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View>
            <Text>{item.name}</Text>
            <Text>------------------</Text>
            <Text>{item.description}</Text>
            <Text>Price: ${item.price}</Text>
            <Text>Status: {item.status}</Text>
            <Text>
              ____________________________________________________________________________________________________________________
            </Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default TespPage;

const styles = StyleSheet.create({
  container: {
    flex: 1, // Ensures the SafeAreaView fills the screen
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
