// HomePage.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { fetchRooms, processRoomBooking } from '@/utils/roomService';  // Import necessary functions
import { Room } from '@/components/model/Room';  // Import Room model
import { useRouter } from 'expo-router';

const HomePage_Screen = () => {
  const [rooms, setRooms] = useState<Room[]>([]);  // State for storing the rooms
  const [loading, setLoading] = useState(true);  // Loading state
  const router = useRouter();  // Router to navigate to other pages

  // Fetch rooms on component mount
  useEffect(() => {
    fetchRooms((fetchedRooms) => {
      setRooms(fetchedRooms);  // Set rooms in the state
      setLoading(false);  // Set loading to false after data is fetched
    });
  }, []);  // Empty dependency array to fetch once on component mount

  // Render room item
  const renderRoomItem = ({ item }: { item: Room }) => (
    <View style={styles.roomContainer}>
      <Image source={{ uri: item.image }} style={styles.roomImage} />
      <View style={styles.roomDetails}>
        <Text style={styles.roomName}>{item.name}</Text>
        <Text style={styles.roomPrice}>${item.price}</Text>
        <TouchableOpacity
          style={[styles.bookButton, item.status === 'available' ? styles.availableButton : styles.bookedButton]}
          onPress={() => handleBookRoom(item)}
          disabled={item.status === 'booked'}
        >
          <Text style={styles.buttonText}>{item.status === 'available' ? 'Book Now' : 'Booked'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  // Handle booking
  const handleBookRoom = (room: Room) => {
    if (room.status === 'available') {
      Alert.alert(
        'Confirm Booking',
        `Do you want to book the room ${room.name}?`,
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Confirm', onPress: () => bookRoom(room) },
        ]
      );
    } else {
      Alert.alert('Room is already booked');
    }
  };

  // Process room booking
  const bookRoom = async (room: Room) => {
    try {
      const user = auth.currentUser;  // Get the current logged-in user
      if (!user) {
        Alert.alert('Not Logged In', 'Please log in to book a room.', [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Log In', onPress: () => router.push('/(auth)/Login') },
        ]);
        return;
      }

      const bookingDetails = {
        roomId: room.id,
        userId: user.uid,
        bookedAt: new Date().toISOString(),
        amount: room.price,
        paymentStatus: 'success',
      };

      // Proceed with booking logic (update room status, add to bookings)
      await processRoomBooking(room.id, user.uid, bookingDetails);

      Alert.alert('Success', `You have booked the ${room.name}`);

      // Update room status to booked
      room.status = 'booked';
      setRooms([...rooms]);  // Trigger re-render with updated room data
    } catch (error) {
      console.error('Error booking room:', error);
      Alert.alert('Error', 'Failed to book room. Please try again.');
    }
  };

  // Show loading indicator if data is still loading
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#fff" />
        <Text style={styles.loadingText}>Loading Rooms...</Text>
      </View>
    );
  }

  // Render the HomePage screen with the list of rooms
  return (
    <View style={styles.safeArea}>
      <Text style={styles.title}>Available Rooms</Text>
      <FlatList
        data={rooms}
        renderItem={renderRoomItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No rooms available</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#25292e' },
  title: { fontSize: 24, color: 'white', fontWeight: 'bold', padding: 16 },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  loadingText: { color: '#fff', fontSize: 16 },
  roomContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 3,
  },
  roomImage: { width: 120, height: 120 },
  roomDetails: { flex: 1, padding: 12 },
  roomName: { fontSize: 18, fontWeight: 'bold' },
  roomPrice: { fontSize: 16, color: '#888' },
  bookButton: { padding: 10, borderRadius: 5, alignItems: 'center' },
  availableButton: { backgroundColor: '#4CAF50' },
  bookedButton: { backgroundColor: '#ccc' },
  buttonText: { color: 'white', fontWeight: 'bold' },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyText: { color: '#fff', fontSize: 18 },
  listContainer: { padding: 16 },
});

export default HomePage_Screen;
