import React, { useState, useEffect } from "react";
import { View, Text, FlatList, Button, Alert, StyleSheet } from "react-native";
import { getRooms, updateRoomStatus } from "@firebaseConfig"; // Assuming correct names
import { Room } from "@/components/model/Room";

const RoomManagement = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const roomData: Room[] = await getRooms(); // Cast to Room[]
        setRooms(roomData);
        setIsLoading(false);
      } catch (err) {
        Alert.alert("Error", "Failed to fetch rooms");
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleStatusChange = async (roomId: string, newStatus: string) => {
    try {
      await updateRoomStatus(roomId, newStatus);
      const updatedRooms = rooms.map((room) =>
        room.id === roomId ? { ...room, status: newStatus } : room
      );
      setRooms(updatedRooms);
      Alert.alert("Success", "Room status updated successfully");
    } catch (error) {
      Alert.alert("Error", "Failed to update room status");
    }
  };

  const renderRoom = ({ item }: { item: Room }) => (
    <View style={styles.roomContainer}>
      <Text style={styles.roomName}>{item.name}</Text>
      <Text style={styles.roomStatus}>Status: {item.status}</Text>
      <Button
        title="Set Available"
        onPress={() => handleStatusChange(item.id, "available")}
      />
      <Button
        title="Set Cleaning"
        onPress={() => handleStatusChange(item.id, "cleaning")}
      />
      <Button
        title="Set Do Not Disturb"
        onPress={() => handleStatusChange(item.id, "do not disturb")}
      />
    </View>
  );

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
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
    padding: 10,
  },
  roomContainer: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
  },
  roomName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  roomStatus: {
    fontSize: 16,
    marginBottom: 10,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default RoomManagement;
