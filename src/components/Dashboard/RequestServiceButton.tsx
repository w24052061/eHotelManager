import React from "react";
import { Button, Alert } from "react-native";
import { addServiceRequest } from "@/utils/firebaseUtils";
import { auth } from "@firebaseConfig";

type RequestServiceButtonProps = {
  bookingId: string;
  roomId: string;
};

export default function RequestServiceButton({
  bookingId,
  roomId,
}: RequestServiceButtonProps) {
  const handleRequestService = async () => {
    try {
      await addServiceRequest({
        bookingId,
        userId: auth.currentUser?.uid,
        roomId,
      });
      Alert.alert(
        "Service Requested",
        "Your service request has been created."
      );
    } catch (err) {
      console.error(err);
      Alert.alert("Error", "Unable to request service.");
    }
  };

  return <Button title="Request Service" onPress={handleRequestService} />;
}
