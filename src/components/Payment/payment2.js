import { Alert } from 'react-native';
import { Stripe } from 'stripe-client'; // Assuming you are using Stripe

const stripe = new Stripe('your-stripe-public-key');

export const processPayment = async (cardDetails, amount) => {
  try {
    const token = await stripe.createToken(cardDetails);
    const response = await fetch('your-server-endpoint', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: token.id,
        amount,
      }),
    });

    if (response.ok) {
      const paymentResult = await response.json();
      return paymentResult;
    } else {
      Alert.alert('Payment failed', 'Please try again.');
      return null;
    }
  } catch (error) {
    Alert.alert('Payment error', error.message);
    return null;
  }
};