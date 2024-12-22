import React, { useEffect, useState } from "react";
import { View, Text, FlatList } from "react-native";
import { getRooms } from "@firebaseConfig"; // Adjust this path as needed

const RoomsComponent = () => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const fetchRooms = async () => {
      const roomsData = await getRooms();
      setRooms(roomsData);
    };

    fetchRooms();
  }, []);

  return (
    <View>
      <FlatList
        data={rooms}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Text>
            {item.name} - ${item.price}
          </Text>
        )}
      />
    </View>
  );
};

export default RoomsComponent;
