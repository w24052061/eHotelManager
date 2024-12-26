import React from "react";
import { Button, Alert } from "react-native";
import { requestCancelBooking } from "@/utils/firebaseUtils"; // Example function

type CancelButtonProps = {
  bookingId: string;
};

export default function CancelButton({ bookingId }: CancelButtonProps) {
  const handleCancelRoom = async () => {
    try {
      // booking status -> "cancel-pending"
      await requestCancelBooking(bookingId);
      Alert.alert(
        "Cancellation",
        "Your cancellation request has been sent to the admin."
      );
    } catch (err) {
      console.error(err);
      Alert.alert("Error", "Unable to request cancellation.");
    }
  };

  return (
    <Button title="Cancel Room" onPress={handleCancelRoom} color="orange" />
  );
}
