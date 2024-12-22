import React, { useState, useEffect } from "react";
import { FlatList, Text, View, Button, Alert, StyleSheet } from "react-native";
import { getComplaints, updateComplaintStatus } from "@firebaseConfig";
import { Complaint } from "@/components/model/complaints";

const ComplaintView = () => {
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const loadComplaints = async () => {
      try {
        const data = await getComplaints();
        setComplaints(data);
        setIsLoading(false);
      } catch (error) {
        setError("Failed to load complaints");
        setIsLoading(false);
        console.error("Error fetching complaints:", error);
      }
    };
    loadComplaints();
  }, []);

  const handleUpdateStatus = async (complaintId: string, newStatus: string) => {
    try {
      await updateComplaintStatus(complaintId, newStatus);
      const updatedComplaints = complaints.map((complaint) =>
        complaint.id === complaintId
          ? { ...complaint, status: newStatus }
          : complaint
      );
      setComplaints(updatedComplaints);
      Alert.alert("Status updated successfully");
    } catch (error) {
      Alert.alert("Error updating status", error.message);
    }
  };

  const renderComplaint = ({ item }: { item: Complaint }) => (
    <View style={styles.complaintItem}>
      <Text style={styles.description}>{item.description}</Text>
      <Text>Status: {item.status}</Text>
      <Button
        title="Resolve"
        onPress={() => handleUpdateStatus(item.id, "resolved")}
      />
    </View>
  );

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <Text>Loading complaints...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>Error: {error}</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={complaints}
      keyExtractor={(item) => item.id}
      renderItem={renderComplaint}
      contentContainerStyle={styles.list}
    />
  );
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  list: {
    padding: 10,
  },
  complaintItem: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  description: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default ComplaintView;
