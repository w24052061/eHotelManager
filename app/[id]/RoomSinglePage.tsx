import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  Image,
  StyleSheet,
  TextInput,
  Button,
  Alert,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { getRoomById } from "@firebaseConfig";
import { isRoomAvailable } from "@/components/RoomManagement/RoomAvailability";
import { addBooking } from "@/components/RoomManagement/RoomBooking";
import { auth } from "@firebaseConfig"; // Ensure Firebase auth is configured

const defaultRoomImage = require("../../assets/images/defaultRoomImage.webp");

export default function RoomSinglePage() {
  // Grab the dynamic param from the route, e.g., /123 => id = "123"
  const { id } = useLocalSearchParams<{ id: string }>();

  // Local state for room data and booking inputs
  const [room, setRoom] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [fromDate, setFromDate] = useState(""); // Start date
  const [toDate, setToDate] = useState(""); // End date
  const [bookingLoading, setBookingLoading] = useState(false); // Booking process indicator

  // Fetch room data when "id" is available
  useEffect(() => {
    if (id) {
      fetchRoomData(id);
    }
  }, [id]);

  async function fetchRoomData(roomId: string) {
    try {
      const fetchedRoom = await getRoomById(roomId);
      setRoom(fetchedRoom);
    } catch (error) {
      console.error("Error fetching room data:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleBooking() {
    if (!fromDate || !toDate) {
      Alert.alert("Error", "Please enter both start and end dates.");
      return;
    }

    setBookingLoading(true);

    try {
      const available = await isRoomAvailable(id as string, fromDate, toDate);

      if (!available) {
        Alert.alert(
          "Unavailable",
          "The room is not available for the selected dates."
        );
        return;
      }

      const userId = auth.currentUser?.uid;
      const email = auth.currentUser?.email;

      if (!userId || !email) {
        Alert.alert("Error", "User not authenticated.");
        return;
      }

      const result = await addBooking({
        roomId: id as string,
        userId,
        fromDate,
        toDate,
        email,
      });

      if (result.success) {
        Alert.alert("Success", "Room booked successfully!");
        // Optionally navigate to a confirmation page or reset input fields
        setFromDate("");
        setToDate("");
      } else {
        Alert.alert("Error", result.message);
      }
    } catch (error) {
      console.error("Error during booking:", error);
      Alert.alert("Error", "An unexpected error occurred.");
    } finally {
      setBookingLoading(false);
    }
  }

  // Show loading spinner while fetching room data
  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  // Handle case when no room is found
  if (!room) {
    return (
      <View style={styles.center}>
        <Text>Room not found.</Text>
      </View>
    );
  }

  // Destructure room fields
  const { name, description, image, price, status } = room;
  const imageSource = image ? { uri: image } : defaultRoomImage;

  // Render room info and booking form
  return (
    <View style={styles.container}>
      <Image source={imageSource} style={styles.roomImage} />
      <Text style={styles.roomTitle}>{name}</Text>
      <Text style={styles.roomDescription}>{description}</Text>
      <Text style={styles.roomPrice}>Price: ${price}</Text>
      <Text style={styles.roomStatus}>Status: {status}</Text>

      <View style={styles.bookingForm}>
        <Text>From Date (YYYY-MM-DD):</Text>
        <TextInput
          value={fromDate}
          onChangeText={setFromDate}
          placeholder="Enter start date"
          style={styles.input}
        />

        <Text>To Date (YYYY-MM-DD):</Text>
        <TextInput
          value={toDate}
          onChangeText={setToDate}
          placeholder="Enter end date"
          style={styles.input}
        />

        <Button
          title={bookingLoading ? "Booking..." : "Book Now"}
          onPress={handleBooking}
          disabled={bookingLoading}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  roomImage: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    marginBottom: 16,
    resizeMode: "cover",
  },
  roomTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  roomDescription: {
    fontSize: 16,
    marginBottom: 16,
  },
  roomPrice: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  roomStatus: {
    fontSize: 16,
    color: "#888",
  },
  bookingForm: {
    marginTop: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 8,
    marginBottom: 12,
  },
});
