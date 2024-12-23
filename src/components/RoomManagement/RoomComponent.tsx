import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import { Link } from "expo-router";
import { getRooms } from "@firebaseConfig";
import { Room } from "@/components/model/Room";
import ButtonComponent from "@/components/ButtonComponent";
import useCheckUserRole from "@/components/CheckUserRole";
import { isRoomAvailable } from "@/components/RoomManagement/RoomAvailability";

// Import the default image asset
const defaultRoomImage = require("../../../assets/images/defaultRoomImage.webp");

export default function RoomComponent() {
  const [rooms, setRooms] = useState<Array<Room & { isUnavailable?: boolean }>>(
    []
  );
  const [loading, setLoading] = useState(true);
  const role = useCheckUserRole();
  const [numColumns, setNumColumns] = useState(1); // Default to 1 column

  useEffect(() => {
    fetchRooms();

    const handleResize = () => {
      const { width } = Dimensions.get("window");
      if (width < 600) {
        setNumColumns(1);
      } else if (width < 900) {
        setNumColumns(2);
      } else if (width < 1200) {
        setNumColumns(3);
      } else {
        setNumColumns(4);
      }
    };

    // Initialize on component mount
    handleResize();

    // Add event listener for window resize
    Dimensions.addEventListener("change", handleResize);

    // Cleanup event listener on unmount
    return () => Dimensions.removeEventListener("change", handleResize);
  }, []);

  async function fetchRooms() {
    try {
      setLoading(true);
      const fetchedRooms = await getRooms(); // Should return an array of Room objects
      console.log("Fetched Rooms:", fetchedRooms);
      // We'll check if each room is available "today"
      const todayStr = new Date().toISOString().split("T")[0]; // e.g. "2024-12-23"

      const updatedRooms = await Promise.all(
        fetchedRooms.map(async (room) => {
          const available = await isRoomAvailable(room.id, todayStr, todayStr);
          return { ...room, isUnavailable: !available };
        })
      );

      setRooms(updatedRooms);
    } catch (error) {
      console.error("Error fetching rooms:", error);
    } finally {
      setLoading(false);
    }
  }

  // Render each room in the list
  const renderRoom = ({
    item,
  }: {
    item: Room & { isUnavailable?: boolean };
  }) => {
    // If `item.image` is empty or undefined, use the local default image
    const imageSource = item.image ? { uri: item.image } : defaultRoomImage;

    // If the room is unavailable, apply a light-gray background
    const containerStyle = [
      styles.roomContainer,
      item.isUnavailable && { backgroundColor: "#e0e0e0" },
    ];

    return (
      <View style={containerStyle}>
        <Link href={`/${item.id}/RoomSinglePage`}>
          <Image source={imageSource} style={styles.roomImage} />
        </Link>
        <Text style={styles.roomName}>{item.name}</Text>
        <Text style={styles.roomDescription}>{item.description}</Text>

        <View style={styles.RoomCardBottom}>
          <View style={styles.RoomCardBottomLeft}>
            <Text style={styles.roomPrice}>Price: ${item.price}</Text>
            <Text style={styles.roomStatus}>
              Status: {item.isUnavailable ? "Unavailable" : "Available"}
            </Text>
          </View>

          <View style={styles.RoomCardBottomRight}>
            {/* Only show the button if the room is available */}
            {!item.isUnavailable &&
              (role === "admin" ? (
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
              ))}
          </View>
        </View>
      </View>
    );
  };

  // Show a loading indicator until rooms are fetched
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#000" />
        <Text>Loading Rooms...</Text>
      </View>
    );
  }

  // Main render
  return (
    <View style={styles.container}>
      <FlatList
        data={rooms}
        keyExtractor={(item) => item.id}
        renderItem={renderRoom}
        numColumns={numColumns} // Dynamically adjust the number of columns
        columnWrapperStyle={numColumns > 1 && styles.columnWrapper}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No rooms available</Text>
          </View>
        }
      />
    </View>
  );
}

/* ---------- STYLES ---------- */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 20,
    backgroundColor: "#f5f5f5",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  roomContainer: {
    flex: 1,
    margin: 8, // Add margin to create space between cards
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
  emptyContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  emptyText: {
    fontSize: 16,
    color: "#999",
  },
  columnWrapper: {
    justifyContent: "space-between",
  },
});
