import React, { useState, useEffect } from "react";
import {
  View,
  FlatList,
  Text,
  Button,
  Alert,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { getComplaints, updateComplaintStatus } from "@firebaseConfig";
import { Complaint } from "@/components/model/complaints"; // Import the Room model

const ComplaintManagement = () => {
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadComplaints = async () => {
      try {
        const fetchedComplaints = await getComplaints(); // Use getComplaints here
        if (fetchedComplaints) {
          setComplaints(fetchedComplaints);
        }
        setIsLoading(false);
      } catch (error) {
        Alert.alert("Error", "Failed to fetch complaints");
        setIsLoading(false);
      }
    };
    loadComplaints();
  }, []);

  const handleUpdateStatus = async (complaintId: string, newStatus: string) => {
    try {
      await updateComplaintStatus(complaintId, newStatus);
      setComplaints((prevComplaints) =>
        prevComplaints.map((complaint) =>
          complaint.id === complaintId
            ? { ...complaint, status: newStatus }
            : complaint
        )
      );
      Alert.alert("Success", "Complaint status updated successfully");
    } catch (error) {
      Alert.alert("Error", "Failed to update complaint status");
    }
  };

  const renderComplaint = ({ item }: { item: Complaint }) => (
    <View style={styles.complaintContainer}>
      <Text style={styles.description}>{item.description}</Text>
      <Text style={styles.status}>Status: {item.status}</Text>
      <Button
        title="Resolve"
        onPress={() => handleUpdateStatus(item.id, "resolved")}
        color="#4CAF50"
      />
    </View>
  );

  if (isLoading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={complaints}
        keyExtractor={(item) => item.id}
        renderItem={renderComplaint}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  complaintContainer: {
    padding: 20,
    marginVertical: 8,
    backgroundColor: "#f9f9f9",
    borderRadius: 5,
  },
  description: {
    marginBottom: 5,
    fontSize: 16,
  },
  status: {
    marginBottom: 10,
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default ComplaintManagement;
