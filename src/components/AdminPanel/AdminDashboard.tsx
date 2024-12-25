// AdminDashboard.js
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  ActivityIndicator,
  Alert,
  ScrollView,
} from "react-native";
import { Button, Card, Title, Paragraph, List } from "react-native-paper";
import Modal from "react-native-modal";
import {
  getRooms,
  getAllBookings, // Use the updated function
  updateRoomDetails,
} from "@firebaseConfig";
import ManageRoomModal from "./ManageRoomModal";

const AdminDashboard = () => {
  const [rooms, setRooms] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const roomsData = await getRooms();
        const bookingsData = await getAllBookings(); // Fetch all bookings

        // Associate bookings with rooms
        const roomsWithBookings = roomsData.map((room) => ({
          ...room,
          bookings: bookingsData
            .filter((booking) => booking.roomId === room.id)
            .sort(
              (a, b) =>
                new Date(a.fromDate).getTime() - new Date(b.fromDate).getTime()
            ),
        }));

        setRooms(roomsWithBookings);
        setBookings(bookingsData);
      } catch (error) {
        console.error("Error fetching data:", error);
        Alert.alert("Error", "Failed to fetch data from Firebase.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const openManageModal = (room) => {
    setSelectedRoom(room);
    setModalVisible(true);
  };

  const closeManageModal = () => {
    setSelectedRoom(null);
    setModalVisible(false);
    // Refresh data after closing modal
    refreshData();
  };

  const refreshData = async () => {
    setLoading(true);
    try {
      const roomsData = await getRooms();
      const bookingsData = await getAllBookings();

      const roomsWithBookings = roomsData.map((room) => ({
        ...room,
        bookings: bookingsData
          .filter((booking) => booking.roomId === room.id)
          .sort(
            (a, b) =>
              new Date(a.fromDate).getTime() - new Date(b.fromDate).getTime()
          ),
      }));

      setRooms(roomsWithBookings);
      setBookings(bookingsData);
    } catch (error) {
      console.error("Error refreshing data:", error);
      Alert.alert("Error", "Failed to refresh data from Firebase.");
    } finally {
      setLoading(false);
    }
  };

  const renderBooking = ({ item }) => (
    <List.Item
      title={`User: ${item.email}`}
      description={`From: ${item.fromDate} To: ${item.toDate}`}
      left={() => <List.Icon icon="calendar" />}
    />
  );

  const renderRoom = ({ item }) => (
    <Card style={styles.card}>
      {item.image ? (
        <Card.Cover source={{ uri: item.image }} />
      ) : (
        <Card.Cover
          source={require("../../../assets/images/defaultRoomImage.webp")}
        />
      )}
      <Card.Content>
        <Title>{item.name}</Title>
        <Paragraph>{item.description}</Paragraph>
        <Paragraph style={styles.price}>Price: ${item.price}</Paragraph>
        <Paragraph>Status: {item.status}</Paragraph>
        <Title style={styles.bookingTitle}>Bookings:</Title>
        {item.bookings.length > 0 ? (
          <FlatList
            data={item.bookings}
            keyExtractor={(booking) => booking.id}
            renderItem={renderBooking}
          />
        ) : (
          <Paragraph>No bookings for this room.</Paragraph>
        )}
      </Card.Content>
      <Card.Actions>
        <Button onPress={() => openManageModal(item)}>Manage</Button>
      </Card.Actions>
    </Card>
  );

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#6200ee" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={rooms}
        keyExtractor={(item) => item.id}
        renderItem={renderRoom}
        contentContainerStyle={styles.list}
      />

      {selectedRoom && (
        <ManageRoomModal
          isVisible={isModalVisible}
          onClose={closeManageModal}
          room={selectedRoom}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  list: {
    paddingBottom: 20,
  },
  card: {
    marginBottom: 20,
  },
  price: {
    marginTop: 5,
    fontWeight: "bold",
  },
  bookingTitle: {
    marginTop: 10,
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default AdminDashboard;
