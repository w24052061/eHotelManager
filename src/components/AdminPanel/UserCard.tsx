import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { ref, update } from "firebase/database";
import { database } from "@firebaseConfig";
import { User } from "@/components/model/Users";

interface UserCardProps {
  user: User;
  onRoleChange: () => void;
}

const UserCard: React.FC<UserCardProps> = ({ user, onRoleChange }) => {
  const handleChangeRole = () => {
    const newRole = user.role === "staff" ? "user" : "staff";
    const action = user.role === "staff" ? "demote to user" : "make staff";

    Alert.alert(
      "Change Role",
      `Are you sure you want to ${action} ${user.name} ${user.surname}?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "OK",
          onPress: async () => {
            try {
              const userRef = ref(database, `users/${user.id}`);
              await update(userRef, { role: newRole });
              Alert.alert("Success", `User role updated to '${newRole}'.`);
              onRoleChange();
            } catch (error) {
              console.error("Error updating role:", error);
              Alert.alert("Error", "Failed to update user role.");
            }
          },
        },
      ]
    );
  };

  return (
    <View
      style={[
        styles.card,
        user.role === "staff" && styles.staffCard, // Green background if role is 'staff'
      ]}
    >
      <Text style={styles.name}>
        {user.name} {user.surname}
      </Text>
      <Text>Email: {user.email}</Text>
      <Text>Mobile: {user.mobile}</Text>
      <Text>Gender: {user.gender}</Text>
      <Text>Role: {user.role}</Text>
      <TouchableOpacity style={styles.button} onPress={handleChangeRole}>
        <Text style={styles.buttonText}>
          {user.role === "staff" ? "Demote to User" : "Make Staff"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default UserCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  staffCard: {
    backgroundColor: "#d4edda", // Light green background
    borderColor: "#c3e6cb",
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  button: {
    backgroundColor: "#4A4E69",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
