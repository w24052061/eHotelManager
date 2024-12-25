// ComplaintsPage.tsx
import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Alert,
  Text,
  Pressable,
  ScrollView,
} from "react-native";
import { Card, Title, Paragraph, Button } from "react-native-paper";
import Modal from "react-native-modal";
import {
  getAllComplaints,
  getAllBookings,
  getRooms,
  deleteComplaint,
} from "@firebaseConfig";

import { Room } from "@/components/model/Room";
import { Booking } from "@/components/model/Booking";
import { Complaint } from "@/components/model/complaints";

const ComplaintsPage: React.FC = () => {
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(
    null
  );
  const [isModalVisible, setModalVisible] = useState<boolean>(false);
  const [relatedBooking, setRelatedBooking] = useState<Booking | null>(null);
  const [relatedRoom, setRelatedRoom] = useState<Room | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [complaintsData, bookingsData, roomsData] = await Promise.all([
        getAllComplaints(),
        getAllBookings(),
        getRooms(),
      ]);
      setComplaints(complaintsData);
      setBookings(bookingsData);
      setRooms(roomsData);
    } catch (error) {
      console.error("Error fetching complaints:", error);
      Alert.alert("Error", "Failed to fetch complaints.");
    } finally {
      setLoading(false);
    }
  };

  const openModal = (complaint: Complaint) => {
    const booking = bookings.find((b) => b.id === complaint.bookingId) || null;
    const room = booking
      ? rooms.find((r) => r.id === booking.roomId) || null
      : null;
    setSelectedComplaint(complaint);
    setRelatedBooking(booking);
    setRelatedRoom(room);
    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedComplaint(null);
    setRelatedBooking(null);
    setRelatedRoom(null);
    setModalVisible(false);
  };

  const handleDelete = async () => {
    if (!selectedComplaint) return;
    Alert.alert(
      "Confirm Deletion",
      "Are you sure you want to delete this complaint?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Remove",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteComplaint(selectedComplaint.id);
              Alert.alert("Success", "Complaint removed successfully.");
              closeModal();
              fetchData(); // Refresh the complaints list
            } catch (error) {
              console.error("❌ Error deleting complaint:", error);
              Alert.alert("Error", "Failed to delete complaint.");
            }
          },
        },
      ]
    );
  };

  const renderComplaint = ({ item }: { item: Complaint }) => {
    // Find related booking
    const booking = bookings.find((b) => b.id === item.bookingId);
    // Find related room
    const room = booking ? rooms.find((r) => r.id === booking.roomId) : null;

    return (
      <Pressable
        onPress={() => openModal(item)}
        style={({ pressed }) => [{ opacity: pressed ? 0.6 : 1 }]}
      >
        <Card style={styles.card}>
          <Card.Content>
            <View style={styles.cardHeader}>
              <Title>{item.title}</Title>
              <Paragraph style={styles.date}>
                {new Date(item.createdAt).toLocaleDateString()}
              </Paragraph>
            </View>
            {booking && (
              <Paragraph style={styles.info}>
                <Text style={styles.label}>User Email: </Text>
                {booking.email}
              </Paragraph>
            )}
            {room && (
              <Paragraph style={styles.info}>
                <Text style={styles.label}>Room ID: </Text>
                {room.id}
              </Paragraph>
            )}
            {room && (
              <Paragraph style={styles.info}>
                <Text style={styles.label}>Room Name: </Text>
                {room.name}
              </Paragraph>
            )}
          </Card.Content>
        </Card>
      </Pressable>
    );
  };

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#6200ee" />
      </View>
    );
  }

  if (complaints.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Paragraph>No complaints available.</Paragraph>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={complaints}
        keyExtractor={(item) => item.id}
        renderItem={renderComplaint}
        contentContainerStyle={styles.list}
      />

      <Modal
        isVisible={isModalVisible}
        onBackdropPress={closeModal}
        onBackButtonPress={closeModal}
        style={styles.modal}
      >
        <ScrollView
          style={styles.modalContent}
          contentContainerStyle={styles.modalContentContainer}
        >
          <Title style={styles.modalTitle}>{selectedComplaint?.title}</Title>
          {relatedBooking && (
            <Paragraph style={styles.info}>
              <Text style={styles.label}>User Email: </Text>
              {relatedBooking.email}
            </Paragraph>
          )}
          {relatedRoom && (
            <Paragraph style={styles.info}>
              <Text style={styles.label}>Room ID: </Text>
              {relatedRoom.id}
            </Paragraph>
          )}
          {relatedRoom && (
            <Paragraph style={styles.info}>
              <Text style={styles.label}>Room Name: </Text>
              {relatedRoom.name}
            </Paragraph>
          )}
          <Paragraph style={styles.date}>
            {selectedComplaint &&
              new Date(selectedComplaint.createdAt).toLocaleString()}
          </Paragraph>
          <Paragraph style={styles.message}>
            {selectedComplaint?.message}
          </Paragraph>
          <View style={styles.buttonContainer}>
            <Button
              mode="contained"
              onPress={handleDelete}
              style={styles.button}
              color="#d32f2f"
            >
              Remove
            </Button>
            <Button mode="outlined" onPress={closeModal} style={styles.button}>
              Close
            </Button>
          </View>
        </ScrollView>
      </Modal>
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
    marginBottom: 15,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  date: {
    marginTop: 5,
    color: "gray",
  },
  info: {
    marginTop: 5,
  },
  label: {
    fontWeight: "bold",
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    justifyContent: "center",
    margin: 20,
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    paddingTop: 0,
    borderRadius: 8,
    maxHeight: "80%", // Limit the maximum height
    flex: 0, // Allow the modal to wrap content
  },
  modalContentContainer: {
    flexGrow: 0, // Prevent ScrollView from expanding
  },
  modalTitle: {
    fontSize: 20,
    marginBottom: 10,
    alignSelf: "center",
  },
  message: {
    marginVertical: 15,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
  },
});

export default ComplaintsPage;
