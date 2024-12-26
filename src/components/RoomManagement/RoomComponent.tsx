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

// -- Firebase & model imports
import { getRooms } from "@firebaseConfig";
import { Room } from "@/components/model/Room";

// -- Utility components / hooks
import ButtonComponent from "@/components/ButtonComponent";
import useCheckUserRole from "@/components/CheckUserRole";
import { isRoomAvailable } from "@/components/RoomManagement/RoomAvailability";

// -- The filters UI
import RoomFilters from "@/components/RoomFilters";

// -- Default image if no room image is provided
const defaultRoomImage = require("../../../assets/images/defaultRoomImage.webp");

export default function RoomComponent() {
  /** ------------------ STATES ------------------ */
  // Holds the full array of rooms (fetched from Firebase).
  const [rooms, setRooms] = useState<Array<Room & { isUnavailable?: boolean }>>(
    []
  );
  // Holds the *filtered* list of rooms (after applying date filter/sorting).
  const [filteredRooms, setFilteredRooms] = useState<
    Array<Room & { isUnavailable?: boolean }>
  >([]);

  // Loading indicator for fetch
  const [loading, setLoading] = useState(true);

  // States for the filter controls
  const [sortOption, setSortOption] = useState("low-to-high");
  const [filterDate, setFilterDate] = useState("");

  // Keep track of the user role (e.g., "admin" or "user")
  const role = useCheckUserRole();

  // Dynamically adjust the number of columns based on screen width
  const [numColumns, setNumColumns] = useState(1);

  /** ------------------ EFFECTS ------------------ */
  // 1) Fetch rooms on mount
  useEffect(() => {
    fetchRooms();
  }, []);

  // 2) Re-apply filters whenever rooms, sortOption, or filterDate changes
  useEffect(() => {
    applyFilters();
  }, [rooms, sortOption, filterDate]);

  // 3) Handle screen resizing to adjust columns
  useEffect(() => {
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

    // Check on mount
    handleResize();

    // Listen for window size changes
    const subscription = Dimensions.addEventListener("change", handleResize);

    // Cleanup
    return () => subscription.remove();
  }, []);

  /** ------------------ DATA FETCH + FILTERS ------------------ */
  async function fetchRooms() {
    try {
      setLoading(true);
      const fetchedRooms = await getRooms(); // Get all rooms from Firebase

      // Example of checking "today" only — you can adapt if your filter is date-range, etc.
      const todayStr = new Date().toISOString().split("T")[0]; // e.g. "2024-12-23"

      // Check availability for each room, then mark "isUnavailable" accordingly
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

  function applyFilters() {
    let updated = [...rooms];

    // If user wants to filter by date (i.e., only show available rooms)
    if (filterDate) {
      updated = updated.filter((room) => !room.isUnavailable);
    }

    // Sort by price (low-to-high or high-to-low)
    if (sortOption === "low-to-high") {
      updated.sort((a, b) => a.price - b.price);
    } else if (sortOption === "high-to-low") {
      updated.sort((a, b) => b.price - a.price);
    }

    setFilteredRooms(updated);
  }

  /** ------------------ RENDER FUNCTIONS ------------------ */
  // Show a spinner if data is still loading
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#000" />
        <Text>Loading Rooms...</Text>
      </View>
    );
  }

  // Helper function to render each room item in the list
  const renderRoom = ({
    item,
  }: {
    item: Room & { isUnavailable?: boolean };
  }) => {
    const imageSource = item.image ? { uri: item.image } : defaultRoomImage;
    const containerStyle = [
      styles.roomContainer,
      item.isUnavailable && { backgroundColor: "#e0e0e0" },
    ];

    return (
      <View style={containerStyle}>
        {role !== "admin" ? (
          <Link href={`/${item.id}/RoomSinglePage`}>
            <Image source={imageSource} style={styles.roomImage} />
          </Link>
        ) : (
          <Image source={imageSource} style={styles.roomImage} />
        )}
        <Text style={styles.roomName}>{item.name}</Text>
        <Text style={styles.roomDescription}>{item.description}</Text>

        <View style={styles.roomCardBottom}>
          <View style={styles.roomCardBottomLeft}>
            <Text style={styles.roomPrice}>Price: ${item.price}</Text>
            <Text style={styles.roomStatus}>
              Status: {item.isUnavailable ? "Unavailable" : "Available"}
            </Text>
          </View>

          <View style={styles.roomCardBottomRight}>
            {/* Only show the button if the room is available */}
            {!item.isUnavailable && role !== "admin" ? (
              <ButtonComponent
                text="Book Now"
                link={`/${item.id}/RoomSinglePage`}
                color="primary"
                width="100%"
              />
            ) : (
              role !== "admin" && (
                <ButtonComponent
                  text="Find Free Dates"
                  link={`/${item.id}/RoomSinglePage`}
                  color="primary"
                  width="100%"
                />
              )
            )}

            {role === "admin" && (
              <ButtonComponent
                text="Manage"
                link={`page/AdminRoomManagement`}
                color="secondary"
                width="100%"
              />
            )}
          </View>
        </View>
      </View>
    );
  };

  // The main return
  return (
    <View style={styles.container}>
      {/* Render the filter controls */}
      <RoomFilters
        sortOption={sortOption}
        setSortOption={setSortOption}
        filterDate={filterDate}
        setFilterDate={setFilterDate}
      />

      {/* Render the list of (filtered) rooms */}
      <FlatList
        data={filteredRooms}
        keyExtractor={(item) => item.id}
        renderItem={renderRoom}
        numColumns={numColumns} // for responsive columns
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

/* --------------- STYLES --------------- */
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
  columnWrapper: {
    justifyContent: "space-between",
  },
  roomContainer: {
    flex: 1,
    margin: 8,
    padding: 12,
    backgroundColor: "#ffffff",
    borderRadius: 8,
    elevation: 2, // shadow on Android
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
  roomCardBottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
  },
  roomCardBottomLeft: {},
  roomCardBottomRight: {},
  roomPrice: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  roomStatus: {
    fontSize: 14,
    color: "#888",
  },
  emptyContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  emptyText: {
    fontSize: 16,
    color: "#999",
  },
});
