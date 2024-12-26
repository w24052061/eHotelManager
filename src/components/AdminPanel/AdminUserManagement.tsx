// AdminUserManagement.tsx

import React, { useState, useEffect } from "react";
import {
  View,
  FlatList,
  ActivityIndicator,
  Text,
  StyleSheet,
  TextInput,
  Platform,
} from "react-native";
import { ref, get } from "firebase/database";
import { database, auth } from "@firebaseConfig";
import UserCard from "./UserCard";
import { User } from "@/components/model/Users";
import { Picker } from "@react-native-picker/picker";

const AdminUserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSort, setSelectedSort] = useState<string>("name");

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    filterAndSortUsers();
  }, [users, searchQuery, selectedSort]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const usersRef = ref(database, "users");
      const snapshot = await get(usersRef);
      if (snapshot.exists()) {
        const usersData = snapshot.val();
        const usersList: User[] = Object.keys(usersData).map((key) => ({
          id: key,
          ...usersData[key],
        }));
        setUsers(usersList);
      } else {
        setUsers([]);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      Alert.alert("Error", "Failed to fetch users.");
    } finally {
      setLoading(false);
    }
  };

  const filterAndSortUsers = () => {
    let updatedUsers = [...users];

    // Exclude Admin Users
    updatedUsers = updatedUsers.filter((user) => user.role !== "admin");

    // Exclude Current Admin User (Optional)
    const currentAdminId = auth.currentUser?.uid;
    if (currentAdminId) {
      updatedUsers = updatedUsers.filter((user) => user.id !== currentAdminId);
    }

    // Search Filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      updatedUsers = updatedUsers.filter(
        (user) =>
          user.name?.toLowerCase().includes(query) ||
          user.surname?.toLowerCase().includes(query) ||
          user.email?.toLowerCase().includes(query)
      );
    }

    // Sorting
    updatedUsers.sort((a, b) => {
      if (selectedSort === "name") {
        return (a.name || "").localeCompare(b.name || "");
      } else if (selectedSort === "email") {
        return (a.email || "").localeCompare(b.email || "");
      } else if (selectedSort === "createdAt") {
        return (
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
      }
      return 0;
    });

    setFilteredUsers(updatedUsers);
  };

  const handleRoleChange = () => {
    fetchUsers(); // Refresh the user list after role change
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>User Management</Text>

      {/* Search Bar */}
      <TextInput
        style={styles.searchBar}
        placeholder="Search by name, surname, or email"
        value={searchQuery}
        onChangeText={(text) => setSearchQuery(text)}
      />

      {/* Sort Dropdown */}
      <View style={styles.pickerContainer}>
        <Text style={styles.sortLabel}>Sort By:</Text>
        <Picker
          selectedValue={selectedSort}
          style={styles.picker}
          onValueChange={(itemValue) => setSelectedSort(itemValue)}
        >
          <Picker.Item label="Name" value="name" />
          <Picker.Item label="Email" value="email" />
          <Picker.Item label="Created At" value="createdAt" />
        </Picker>
      </View>

      {/* Users List */}
      {filteredUsers.length === 0 ? (
        <Text style={styles.noUsers}>No users found.</Text>
      ) : (
        <FlatList
          data={filteredUsers}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <UserCard user={item} onRoleChange={handleRoleChange} />
          )}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </View>
  );
};

export default AdminUserManagement;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
    color: "#4A4E69",
  },
  searchBar: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    marginBottom: 16,
  },
  pickerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  sortLabel: {
    marginRight: 10,
    fontSize: 16,
    color: "#333",
  },
  picker: {
    flex: 1,
    height: 50,
    backgroundColor: "#fff",
  },
  listContainer: {
    paddingBottom: 20,
  },
  noUsers: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 20,
    color: "#888",
  },
});
