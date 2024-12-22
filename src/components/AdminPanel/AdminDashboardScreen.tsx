import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Alert,
} from "react-native";
import { getRooms } from "@firebaseConfig"; // Correct import assuming getRooms is correctly exported

// Define the structure of the room data
interface Room {
  id: string;
  name: string;
  status: string;
  price: number;
}

const Dashboard = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchRoomsData = async () => {
      try {
        const roomsData = await getRooms();
        setRooms(roomsData);
        setIsLoading(false);
      } catch (err) {
        setError("Failed to fetch rooms");
        setIsLoading(false);
        Alert.alert("Error", "Failed to load rooms. Please try again later.");
      }
    };
    fetchRoomsData();
  }, []);

  const renderRoom = ({ item }: { item: Room }) => (
    <View style={styles.roomContainer}>
      <Text style={styles.roomName}>{item.name}</Text>
      <Text>Status: {item.status}</Text>
      <Text>Price: ${item.price.toFixed(2)}</Text>
    </View>
  );

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dashboard</Text>
      <FlatList
        data={rooms}
        renderItem={renderRoom}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  roomContainer: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  roomName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Dashboard;
