import React, { useState, useEffect } from 'react';
import { FlatList, Text, View, StyleSheet } from 'react-native';
import { fetchBookingHistory } from '../../services/firebase';

const BookingHistory = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchBookingHistory();
      setBookings(data);
    };
    fetchData();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{item.roomName}</Text>
      <Text>{item.date}</Text>
      <Text>{item.status}</Text>
    </View>
  );

  return (
    <FlatList
      data={bookings}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
    />
  );
};

const styles = StyleSheet.create({
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    backgroundColor: '#f9c2ff',
  },
  title: {
    fontSize: 24,
  },
});

export default BookingHistory;