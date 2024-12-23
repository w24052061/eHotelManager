import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  Image,
  StyleSheet,
  Button,
  Alert,
  ScrollView,
} from "react-native";
import { Calendar } from "react-native-calendars";
import { useLocalSearchParams } from "expo-router";
import { getRoomById } from "@firebaseConfig";
import { fetchBookings } from "@/utils/firebaseUtils";
import { addBooking } from "@/components/RoomManagement/RoomBooking";
import { auth } from "@firebaseConfig";
import HamburgerMenu from "@/components/HamburgerMenu";

export default function RoomSinglePage() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [room, setRoom] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const [selectedDates, setSelectedDates] = useState<{ [key: string]: any }>(
    {}
  );
  const [bookedDates, setBookedDates] = useState<string[]>([]);
  const [bookingLoading, setBookingLoading] = useState(false);

  useEffect(() => {
    if (id) {
      fetchRoomData(id);
      fetchBookedDates(id);
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

  async function fetchBookedDates(roomId: string) {
    try {
      const bookings = await fetchBookings(roomId);
      const dates = bookings.flatMap((booking) => {
        const startDate = new Date(booking.fromDate);
        const endDate = new Date(booking.toDate);
        const bookedRange: string[] = [];
        for (
          let date = startDate;
          date <= endDate;
          date.setDate(date.getDate() + 1)
        ) {
          bookedRange.push(date.toISOString().split("T")[0]);
        }
        return bookedRange;
      });
      setBookedDates(dates);
    } catch (error) {
      console.error("Error fetching booked dates:", error);
    }
  }

  const handleDayPress = (day: any) => {
    const { dateString } = day;

    if (selectedDates[dateString]) {
      const updatedDates = { ...selectedDates };
      delete updatedDates[dateString];
      setSelectedDates(updatedDates);
    } else {
      setSelectedDates({
        ...selectedDates,
        [dateString]: { selected: true, selectedColor: "blue" },
      });
    }
  };

  const handleBooking = async () => {
    const dates = Object.keys(selectedDates);
    if (dates.length === 0) {
      Alert.alert("Error", "Please select at least one date.");
      return;
    }

    setBookingLoading(true);

    try {
      const userId = auth.currentUser?.uid;
      const email = auth.currentUser?.email;

      if (!userId || !email) {
        Alert.alert("Error", "User not authenticated.");
        return;
      }

      const result = await addBooking({
        roomId: id as string,
        userId,
        fromDate: dates[0],
        toDate: dates[dates.length - 1],
        email,
      });

      if (result.success) {
        Alert.alert("Success", "Room booked successfully!");
        setSelectedDates({});
        fetchBookedDates(id); // Refresh booked dates
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

  const markedDates = {
    ...bookedDates.reduce(
      (acc, date) => ({
        ...acc,
        [date]: {
          disabled: true,
          disableTouchEvent: true,
          marked: true,
          dotColor: "red",
        },
      }),
      {}
    ),
    ...selectedDates,
  };

  return (
    <ScrollView style={styles.container}>
      <HamburgerMenu />
      {image && <Image source={{ uri: image }} style={styles.roomImage} />}
      <Text style={styles.roomTitle}>{name}</Text>
      <Text style={styles.roomDescription}>{description}</Text>
      <Text style={styles.roomPrice}>Price: ${price}</Text>
      <Text style={styles.roomStatus}>Status: {status}</Text>

      <Calendar
        onDayPress={handleDayPress}
        markedDates={markedDates}
        minDate={new Date().toISOString().split("T")[0]} // Only today and future dates
        markingType={"period"}
      />

      <View style={styles.bookingButton}>
        <Button
          title={bookingLoading ? "Booking..." : "Book Now"}
          onPress={handleBooking}
          disabled={bookingLoading}
        />
      </View>
    </ScrollView>
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
    padding: 16,
    backgroundColor: "#fff",
  },
  roomImage: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    marginBottom: 16,
    marginTop: 35,
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
  bookingButton: {
    marginTop: 16,
    marginBottom: 50,
  },
});
