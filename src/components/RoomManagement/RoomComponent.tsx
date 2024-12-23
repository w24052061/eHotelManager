import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  ListRenderItem,
} from "react-native";

import { getRooms } from "@firebaseConfig";
import { Room } from "@/components/model/Room";
import ButtonComponent from "@/components/ButtonComponent";
import useCheckUserRole from "@/components/CheckUserRole";
import { isRoomAvailable } from "@/components/RoomManagement/RoomAvailability";

// Import the default image asset
const defaultRoomImage = require("../../../assets/images/defaultRoomImage.webp");

const RoomComponent = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const role = useCheckUserRole();

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const fetchedRooms = await getRooms(); // from firebaseConfig.js
      setRooms(fetchedRooms);
    } catch (error) {
      console.log("Error fetching rooms:", error);
    }
  };

  // Render each room in the list
  const renderRoom: ListRenderItem<Room> = ({ item }) => {
    // If `item.image` is empty or undefined, use `defaultRoomImage`
    const imageSource = item.image ? { uri: item.image } : defaultRoomImage;

    return (
      <View style={styles.roomContainer}>
        <Image source={imageSource} style={styles.roomImage} />
        <Text style={styles.roomName}>{item.name}</Text>
        <Text style={styles.roomDescription}>{item.description}</Text>
        <View style={styles.RoomCardBottom}>
          <View style={styles.RoomCardBottomLeft}>
            <Text style={styles.roomPrice}>Price: ${item.price}</Text>
            <Text style={styles.roomStatus}>Status: {item.status}</Text>
          </View>
          <View style={styles.RoomCardBottomRight}>
            {role === "admin" ? (
              <ButtonComponent
                text="Edit Room"
                link={`/${item.id}/RoomSinglePage`}
                color="secondary"
                width="100%"
              />
            ) : (
              <ButtonComponent
                text="Book Room"
                link={`/${item.id}/RoomSinglePage`}
                color="primary"
                width="100%"
              />
            )}
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={rooms}
        keyExtractor={(item) => item.id}
        renderItem={renderRoom}
      />
    </View>
  );
};

export default RoomComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 20,
    backgroundColor: "#f5f5f5",
  },
  roomContainer: {
    marginBottom: 16,
    padding: 12,
    backgroundColor: "#ffffff",
    borderRadius: 8,
    elevation: 2, // Adds a bit of shadow on Android
  },
  roomImage: {
    width: "100%",
    height: 180,
    borderRadius: 8,
    resizeMode: "cover",
  },
  roomName: {
    fontSize: 18,
    fontWeight: "600",
    marginVertical: 8,
  },
  roomDescription: {
    fontSize: 14,
    color: "#555",
    marginBottom: 8,
  },
  roomPrice: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  roomStatus: {
    fontSize: 14,
    color: "#888",
  },
  RoomCardBottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
  },
  RoomCardBottomLeft: {},
  RoomCardBottomRight: {},
});
