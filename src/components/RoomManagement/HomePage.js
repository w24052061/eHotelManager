import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, Button, StyleSheet } from 'react-native';
import { fetchRooms } from '../../services/firebase';

const HomePage = ({ navigation }) => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const loadRooms = async () => {
      const fetchedRooms = await fetchRooms();
      setRooms(fetchedRooms);
    };
    loadRooms();
  }, []);

  const renderRoom = ({ item }) => (
    <View style={styles.roomContainer}>
      <Text style={styles.roomName}>{item.name}</Text>
      <Text style={styles.roomDescription}>{item.description}</Text>
      <Text style={styles.roomPrice}>${item.price}</Text>
      <Button
        title="View Details"
        onPress={() => navigation.navigate('RoomDetailPage', { roomId: item.id })}
      />
    </View>
  );

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
    padding: 16,
  },
  roomContainer: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  roomName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  roomDescription: {
    fontSize: 14,
    color: '#666',
    marginVertical: 8,
  },
  roomPrice: {
    fontSize: 16,
    color: '#000',
    marginBottom: 8,
  },
});

export default HomePage;