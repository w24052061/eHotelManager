import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { ref, remove, update } from "firebase/database";
import { database } from "@firebaseConfig";
import { User } from "@/components/model/Users";

interface UserCardProps {
  user: User;
  onRoleChange: () => void;
  onDelete?: () => void; // Made optional to avoid errors
}

const ROLES = { STAFF: "staff", USER: "user" }; // Role constants for better maintainability

const UserCard: React.FC<UserCardProps> = ({
  user,
  onRoleChange,
  onDelete = () => {},
}) => {
  const [loading, setLoading] = React.useState(false); // State for showing a loading indicator

  const handleChangeRole = () => {
    const newRole = user.role === ROLES.STAFF ? ROLES.USER : ROLES.STAFF;
    const action = user.role === ROLES.STAFF ? "demote to user" : "make staff";

    Alert.alert(
      "Change Role",
      `Are you sure you want to ${action} ${user.name} ${user.surname}?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "OK",
          onPress: async () => {
            setLoading(true); // Show loading indicator
            try {
              const userRef = ref(database, `users/${user.id}`);
              await update(userRef, { role: newRole });
              Alert.alert("Success", `User role updated to '${newRole}'.`);
              onRoleChange(); // Notify parent about role change
            } catch (error: any) {
              console.error("Error updating role:", error);
              Alert.alert(
                "Error",
                `Failed to update user role: ${error.message}`
              );
            } finally {
              setLoading(false); // Hide loading indicator
            }
          },
        },
      ]
    );
  };

  const handleDeleteUser = () => {
    Alert.alert(
      "Delete this user?",
      `Are you sure you want to delete ${user.name} ${user.surname}?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "OK",
          onPress: async () => {
            setLoading(true); // Show loading indicator
            try {
              const userRef = ref(database, `users/${user.id}`);
              await remove(userRef);
              Alert.alert(
                "Success",
                `Successfully deleted ${user.name} ${user.surname}.`
              );
              onDelete();
            } catch (error: any) {
              console.error("Error deleting user:", error);
              Alert.alert(
                "Error",
                `Failed to delete the user: ${error.message}`
              );
            } finally {
              setLoading(false);
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
        user.role === ROLES.STAFF && styles.staffCard, // Green background if role is 'staff'
      ]}
    >
      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#4A4E69" />
        </View>
      )}
      <TouchableOpacity onPress={handleDeleteUser}>
        <Text style={styles.remove}>🗑</Text>
      </TouchableOpacity>
      <Text style={styles.name}>
        {user.name} {user.surname}
      </Text>
      <Text>Email: {user.email}</Text>
      <Text>Mobile: {user.mobile}</Text>
      <Text>Gender: {user.gender}</Text>
      <Text>Role: {user.role}</Text>
      <TouchableOpacity style={styles.button} onPress={handleChangeRole}>
        <Text style={styles.buttonText}>
          {user.role === ROLES.STAFF ? "Demote to User" : "Make Staff"}
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
    position: "relative",
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
  remove: {
    textAlign: "right",
    fontSize: 40,
    marginBottom: -30,
    color: "#4A4E69",
    fontWeight: "bold",
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
    borderRadius: 8,
  },
});
