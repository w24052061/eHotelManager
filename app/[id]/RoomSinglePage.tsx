import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  Image,
  StyleSheet,
  Button,
  Alert,
  Platform,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useLocalSearchParams } from "expo-router";
import { getRoomById } from "@firebaseConfig";
import { isRoomAvailable } from "@/components/RoomManagement/RoomAvailability";
import { addBooking } from "@/components/RoomManagement/RoomBooking";
import { auth } from "@firebaseConfig";
import HamburgerMenu from "@/components/HamburgerMenu";

const defaultRoomImage = require("../../assets/images/defaultRoomImage.webp");

export default function RoomSinglePage() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [room, setRoom] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const [fromDate, setFromDate] = useState<Date | null>(null);
  const [toDate, setToDate] = useState<Date | null>(null);
  const [showFromPicker, setShowFromPicker] = useState(false);
  const [showToPicker, setShowToPicker] = useState(false);
  const [bookingLoading, setBookingLoading] = useState(false);

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

  const handleBooking = async () => {
    if (!fromDate || !toDate) {
      Alert.alert("Error", "Please select both start and end dates.");
      return;
    }

    if (toDate <= fromDate) {
      Alert.alert("Error", "End date must be after start date.");
      return;
    }

    setBookingLoading(true);

    try {
      const available = await isRoomAvailable(
        id as string,
        fromDate.toISOString().split("T")[0],
        toDate.toISOString().split("T")[0]
      );

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
        fromDate: fromDate.toISOString().split("T")[0],
        toDate: toDate.toISOString().split("T")[0],
        email,
      });

      if (result.success) {
        Alert.alert("Success", "Room booked successfully!");
        setFromDate(null);
        setToDate(null);
      } else {
        Alert.alert("Error", result.message);
      }
    } catch (error) {
      console.error("Error during booking:", error);
      Alert.alert("Error", "An unexpected error occurred.");
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  if (!room) {
    return (
      <View style={styles.center}>
        <Text>Room not found.</Text>
      </View>
    );
  }

  const { name, description, image, price, status } = room;
  const imageSource = image ? { uri: image } : defaultRoomImage;

  return (
    <View style={styles.container}>
      <HamburgerMenu />
      <Image source={imageSource} style={styles.roomImage} />
      <Text style={styles.roomTitle}>{name}</Text>
      <Text style={styles.roomDescription}>{description}</Text>
      <Text style={styles.roomPrice}>Price: ${price}</Text>
      <Text style={styles.roomStatus}>Status: {status}</Text>

      <View style={styles.bookingForm}>
        <Text>Select From Date:</Text>
        <Button
          title={fromDate ? fromDate.toDateString() : "Pick a date"}
          onPress={() => setShowFromPicker(true)}
        />
        {showFromPicker && (
          <DateTimePicker
            value={fromDate || new Date()}
            mode="date"
            display={Platform.OS === "ios" ? "inline" : "default"}
            minimumDate={new Date()}
            onChange={(event, date) => {
              setShowFromPicker(false);
              if (date) setFromDate(date);
            }}
          />
        )}

        <Text>Select To Date:</Text>
        <Button
          title={toDate ? toDate.toDateString() : "Pick a date"}
          onPress={() => setShowToPicker(true)}
        />
        {showToPicker && (
          <DateTimePicker
            value={toDate || new Date()}
            mode="date"
            display={Platform.OS === "ios" ? "inline" : "default"}
            minimumDate={fromDate || new Date()}
            onChange={(event, date) => {
              setShowToPicker(false);
              if (date) setToDate(date);
            }}
          />
        )}

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
});
