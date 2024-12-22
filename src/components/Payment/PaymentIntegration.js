import React, { useState } from 'react';
import { Button, Alert } from 'react-native';
import { processPayment } from '../../services/payment';

const PaymentIntegration = ({ bookingDetails, onPaymentSuccess }) => {
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    setLoading(true);
    try {
      const paymentResult = await processPayment(bookingDetails);
      if (paymentResult.success) {
        onPaymentSuccess();
        Alert.alert('Payment Successful', 'Your booking has been confirmed.');
      } else {
        Alert.alert('Payment Failed', 'Please try again.');
      }
    } catch (error) {
      Alert.alert('Payment Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      title={loading ? 'Processing...' : 'Pay Now'}
      onPress={handlePayment}
      disabled={loading}
    />
  );
};

export default PaymentIntegration;