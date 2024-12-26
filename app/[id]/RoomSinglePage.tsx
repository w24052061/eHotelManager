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
  TextInput,
  Modal,
  TouchableOpacity,
} from "react-native";
import { Calendar } from "react-native-calendars";
import { Redirect, useLocalSearchParams } from "expo-router";
import { getRoomById } from "@firebaseConfig";
import { fetchBookings } from "@/utils/firebaseUtils";
import { addBooking } from "@/components/RoomManagement/RoomBooking";
import { auth } from "@firebaseConfig";
import HamburgerMenu from "@/components/HamburgerMenu";
import useCheckUserRole from "@/components/CheckUserRole";
import ButtonComponent from "@/components/ButtonComponent";
import { useRouter } from "expo-router";

export default function RoomSinglePage() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [room, setRoom] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const role = useCheckUserRole();
  const isLoggedIn = role !== "" && role !== "loading";
  const router = useRouter();

  const [selectedDates, setSelectedDates] = useState<{ [key: string]: any }>(
    {}
  );
  const [bookedDates, setBookedDates] = useState<string[]>([]);
  const [bookingLoading, setBookingLoading] = useState(false);

  // Modal states
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [userName, setUserName] = useState("");

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

        // Redirect to the dashboard
        router.push("/page/MyBookingsList");
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

  const handlePayment = () => {
    if (cardNumber !== "1111222233334444") {
      Alert.alert("Error", "Invalid card number.");
      return;
    }

    if (!userName) {
      const fallbackName = auth.currentUser?.email.split("@")[0];
      setUserName(fallbackName || "");
      Alert.alert("Notice", `Using fallback name: ${fallbackName}`);
    }

    setIsModalVisible(false); // Close the modal
    handleBooking(); // Proceed with booking
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

      {isLoggedIn ? (
        <View style={styles.bookingButton}>
          <Button
            title={bookingLoading ? "Processing..." : "Book Now"}
            onPress={() => setIsModalVisible(true)}
            disabled={bookingLoading}
          />
        </View>
      ) : (
        <ButtonComponent
          text="Login to Book"
          link={"Login"}
          color="default"
          width="100%"
        />
      )}

      {/* Modal for Payment */}
      <Modal visible={isModalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Enter Payment Details</Text>
            <TextInput
              style={styles.input}
              placeholder="Insert only: 1111222233334444"
              placeholderTextColor="lightgrey"
              keyboardType="number-pad"
              value={cardNumber}
              onChangeText={setCardNumber}
            />
            <TextInput
              style={styles.input}
              placeholder={`Any name: ${
                auth.currentUser?.email.split("@")[0] || ""
              }`}
              placeholderTextColor="lightgrey"
              value={userName}
              onChangeText={setUserName}
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.button} onPress={handlePayment}>
                <Text style={styles.buttonText}>Pay</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonCancel}
                onPress={() => setIsModalVisible(false)}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 8,
    marginBottom: 16,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  button: {
    flex: 1,
    backgroundColor: "blue",
    padding: 10,
    marginHorizontal: 5,
    alignItems: "center",
    borderRadius: 8,
  },
  buttonCancel: {
    flex: 1,
    backgroundColor: "red",
    padding: 10,
    marginHorizontal: 5,
    alignItems: "center",
    borderRadius: 8,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },

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
