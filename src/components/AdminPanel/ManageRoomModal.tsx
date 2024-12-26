import React, { useState, useEffect } from "react";
import { View, StyleSheet, Alert, ScrollView } from "react-native";
import { Modal, TextInput, Button, Text } from "react-native-paper";
import { updateRoomDetails } from "@firebaseConfig";

const ManageRoomModal = ({ isVisible, onClose, room }) => {
  const [name, setName] = useState(room.name);
  const [description, setDescription] = useState(room.description);
  const [price, setPrice] = useState(room.price.toString());
  const [image, setImage] = useState(room.image);

  useEffect(() => {
    if (room) {
      setName(room.name);
      setDescription(room.description);
      setPrice(room.price.toString());
      setImage(room.image);
    }
  }, [room]);

  const handleUpdate = async () => {
    // Input validation
    if (!name || !description || !price || !image) {
      Alert.alert("Validation Error", "All fields are required.");
      return;
    }

    const priceValue = parseFloat(price);
    if (isNaN(priceValue) || priceValue < 0) {
      Alert.alert("Validation Error", "Price must be a positive number.");
      return;
    }

    // Update data
    const updatedData = {
      name,
      description,
      price: priceValue,
      image,
    };

    try {
      await updateRoomDetails(room.id, updatedData);
      Alert.alert("Success", "Room details updated successfully.");
      onClose();
    } catch (error) {
      console.error("Error updating room:", error);
      Alert.alert("Error", "Failed to update room details.");
    }
  };

  return (
    <Modal
      visible={isVisible}
      onDismiss={onClose}
      contentContainerStyle={styles.modal}
    >
      <ScrollView>
        <Text style={styles.title}>Manage Room</Text>
        <TextInput
          label="Room Name"
          value={name}
          onChangeText={setName}
          style={styles.input}
        />
        <TextInput
          label="Description"
          value={description}
          onChangeText={setDescription}
          style={styles.input}
          multiline
        />
        <TextInput
          label="Price"
          value={price}
          onChangeText={setPrice}
          style={styles.input}
          keyboardType="numeric"
        />
        <TextInput
          label="Image URL"
          value={image}
          onChangeText={setImage}
          style={styles.input}
        />
        <View style={styles.buttonContainer}>
          <Button mode="contained" onPress={handleUpdate}>
            Update
          </Button>
          <Button mode="outlined" onPress={onClose} style={styles.cancelButton}>
            Cancel
          </Button>
        </View>
      </ScrollView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    backgroundColor: "white",
    padding: 20,
    margin: 20,
    borderRadius: 8,
    maxHeight: "90%",
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
    alignSelf: "center",
  },
  input: {
    marginBottom: 15,
    backgroundColor: "white",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cancelButton: {
    marginLeft: 10,
  },
});

export default ManageRoomModal;
