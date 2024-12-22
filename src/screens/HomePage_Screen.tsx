import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, ActivityIndicator, Alert, Dimensions } from 'react-native';
import { fetchRooms } from '@/utils/roomService';  // Import necessary functions
import { Room } from '@/components/model/Room';  // Import Room model
import { useRouter } from 'expo-router';
import ButtonComponent from '@/components/ButtonComponent';
import MenuComponent from '@/components/MenuComponent'; // Import MenuComponent
import HamburgerMenu from '@/components/HamburgerMenu'; // Import MenuComponent
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { auth } from '@firebaseConfig';

const HomePage_Screen = () => {
  const [rooms, setRooms] = useState<Room[]>([]);  // State for storing the rooms
  const [loading, setLoading] = useState(true);  // Loading state
  const [isLoggedIn, setIsLoggedIn] = useState(false);  // Logged-in state
  const router = useRouter();  // Router to navigate to other pages

  // Fetch rooms on component mount
  useEffect(() => {
    fetchRooms((fetchedRooms) => {
      setRooms(fetchedRooms);  // Set rooms in the state
      setLoading(false);  // Set loading to false after data is fetched
    });

    // Check if the user is logged in or not
    onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user); // If user is logged in, set the state to true
    });
  }, []);  // Empty dependency array to fetch once on component mount

  // Get the screen width for responsiveness
  const screenWidth = Dimensions.get('window').width;

  // Calculate number of columns based on screen width (responsive layout)
  const numColumns = screenWidth < 600 ? 2 : screenWidth < 1200 ? 3 : 4;  // 1 for mobile, 2 for tablet, 3 for desktop

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













  //------------------------------------- Render the HomePage screen with the list of rooms -------------------------------------
  //------------------------------------- Render the HomePage screen with the list of rooms -------------------------------------
  //------------------------------------- Render the HomePage screen with the list of rooms -------------------------------------
  return (
    <View style={styles.safeArea}>
      {/* Show Menu if Logged In, Show Login Button if Not */}
      {isLoggedIn ? (
        <HamburgerMenu /> // Show menu if the user is logged in
      ) : (
        <ButtonComponent text="Go to Login Page" link="/Login" color="secondary" width={200} /> // Show login button if not logged in
      )}

      <Text style={styles.title}>Available Rooms</Text>
      <FlatList
        data={rooms}
        renderItem={renderRoomItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={numColumns}  // Responsive columns
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
  title: { fontSize: 24, color: 'white', fontWeight: 'bold', padding: 16, textAlign: 'center' },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  loadingText: { color: '#fff', fontSize: 16 },
  roomContainer: {
    flex: 1,
    flexDirection: 'column',
    marginBottom: 16,
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 3,
    marginHorizontal: 10,
  },
  roomImage: { width: '100%', height: 120 },
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
