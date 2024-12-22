import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, Image, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { getRoomById } from "@firebaseConfig";

const defaultRoomImage = require("../../assets/images/defaultRoomImage.webp");
export default function RoomSinglePage() {
  // 1. Grab the dynamic param from the route, e.g. /123 => id = "123"
  const { id } = useLocalSearchParams<{ id: string }>();

  // 2. Local state to store room data
  const [room, setRoom] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // 3. Fetch room data once we have an "id"
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

  // 4. Show loading spinner (or any placeholder) while fetching
  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  // 5. If no room found, handle error or fallback
  if (!room) {
    return (
      <View style={styles.center}>
        <Text>Room not found.</Text>
      </View>
    );
  }

  // 6. Destructure room fields
  const { name, description, image, price, status } = room;
  const imageSource = image ? { uri: image } : defaultRoomImage;

  // 7. Render your room info
  return (
    <View style={styles.container}>
      <Image source={imageSource} style={styles.roomImage} />
      <Text style={styles.roomTitle}>{name}</Text>
      <Text style={styles.roomDescription}>{description}</Text>
      <Text style={styles.roomPrice}>Price: ${price}</Text>
      <Text style={styles.roomStatus}>Status: {status}</Text>
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
});
