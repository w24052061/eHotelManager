import React, { useState } from 'react';
import { View, Text, Button, Alert } from 'react-native';
import { confirmBooking } from '../../services/firebase';

const BookingConfirmation = ({ route, navigation }) => {
  const { roomId, userId } = route.params;
  const [loading, setLoading] = useState(false);

  const handleConfirmBooking = async () => {
    setLoading(true);
    try {
      await confirmBooking(roomId, userId);
      Alert.alert('Booking Confirmed', 'Your booking has been confirmed.');
      navigation.navigate('BookingHistory');
    } catch (error) {
      Alert.alert('Error', 'There was an error confirming your booking.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Confirm your booking</Text>
      <Button title="Confirm Booking" onPress={handleConfirmBooking} disabled={loading} />
    </View>
  );
};

export default BookingConfirmation;