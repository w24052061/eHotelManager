// AdminRequests.tsx

import React, { useState, useEffect } from "react";
import {
  View,
  FlatList,
  ActivityIndicator,
  Text,
  StyleSheet,
  Alert,
} from "react-native";
import { ref, get, update } from "firebase/database";
import { database } from "@firebaseConfig";
import AdminRequestCard from "./AdminRequestCard";
import { AdminRequest } from "@/components/model/AdminRequest";

interface UserRoleMap {
  [key: string]: string; // userId: role
}

const AdminRequests: React.FC = () => {
  const [requests, setRequests] = useState<AdminRequest[]>([]);
  const [userRoles, setUserRoles] = useState<UserRoleMap>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      setLoading(true);

      // Fetch User Roles
      const usersRef = ref(database, "users");
      const usersSnapshot = await get(usersRef);
      let rolesMap: UserRoleMap = {};

      if (usersSnapshot.exists()) {
        const usersData = usersSnapshot.val();
        rolesMap = Object.keys(usersData).reduce((acc, key) => {
          acc[key] = usersData[key].role || "user"; // default to 'user' if role is undefined
          return acc;
        }, {} as UserRoleMap);
      }

      setUserRoles(rolesMap);

      // Fetch Cancellation Requests
      const bookingsRef = ref(database, "bookings");
      const bookingsSnapshot = await get(bookingsRef);
      let cancellationRequests: AdminRequest[] = [];

      if (bookingsSnapshot.exists()) {
        const bookingsData = bookingsSnapshot.val();
        const today = new Date().toISOString().split("T")[0];

        cancellationRequests = Object.keys(bookingsData)
          .map((key) => ({
            id: key,
            type: "cancel" as "cancel",
            createdAtTimestamp: bookingsData[key].cancelRequestedAt
              ? bookingsData[key].cancelRequestedAt
              : new Date(bookingsData[key].createdAt).getTime(),
            roomId: bookingsData[key].roomId,
            status: bookingsData[key].status || "",
            userId: bookingsData[key].userId,
            bookingId: key,
            fromDate: bookingsData[key].fromDate,
            toDate: bookingsData[key].toDate,
          }))
          .filter((booking: AdminRequest) => {
            const { status, toDate, userId } = booking;
            return (
              (status === "cancel-pending" || status === "cancel-accepted") &&
              toDate >= today &&
              rolesMap[userId] !== "admin"
            );
          });
      }

      // Fetch Service Requests
      const servicesRef = ref(database, "services");
      const servicesSnapshot = await get(servicesRef);
      let serviceRequests: AdminRequest[] = [];

      if (servicesSnapshot.exists()) {
        const servicesData = servicesSnapshot.val();

        serviceRequests = Object.keys(servicesData)
          .map((key) => ({
            id: key,
            type: "service" as "service",
            createdAtTimestamp: servicesData[key].createdAt,
            roomId: servicesData[key].roomId,
            status: servicesData[key].status || "",
            userId: servicesData[key].userId,
            serviceId: servicesData[key].serviceId,
            bookingId: servicesData[key].bookingId,
          }))
          .filter((service: AdminRequest) => {
            const { status, userId } = service;
            return status === "pending" && rolesMap[userId] !== "admin";
          });
      }

      // Merge and Sort Requests
      const allRequests = [...cancellationRequests, ...serviceRequests];
      allRequests.sort((a, b) => b.createdAtTimestamp - a.createdAtTimestamp);

      setRequests(allRequests);
    } catch (error) {
      console.error("Error fetching requests:", error);
      Alert.alert("Error", "Failed to fetch requests.");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (
    request: AdminRequest,
    newStatus: string
  ) => {
    try {
      if (request.type === "cancel") {
        const bookingRef = ref(database, `bookings/${request.id}`);
        await update(bookingRef, { status: newStatus });
      } else if (request.type === "service") {
        const serviceRef = ref(database, `services/${request.id}`);
        await update(serviceRef, { status: newStatus });
      }

      // Refresh the list after update
      fetchAllData();
    } catch (error) {
      console.error("Error updating status:", error);
      Alert.alert("Error", "Failed to update request status.");
    }
  };

  const getAcceptStatus = (request: AdminRequest): string => {
    if (request.type === "cancel") {
      return "cancel-accepted";
    } else if (request.type === "service") {
      return "accepted";
    }
    return "";
  };

  const getRejectStatus = (request: AdminRequest): string => {
    if (request.type === "cancel") {
      return "cancel-rejected";
    } else if (request.type === "service") {
      return "rejected";
    }
    return "";
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (requests.length === 0) {
    return <Text style={styles.noRequests}>No requests found.</Text>;
  }

  return (
    <FlatList
      data={requests}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <AdminRequestCard
          request={item}
          onAccept={() => handleStatusUpdate(item, getAcceptStatus(item))}
          onReject={() => handleStatusUpdate(item, getRejectStatus(item))}
        />
      )}
      contentContainerStyle={styles.listContainer}
    />
  );
};

export default AdminRequests;

const styles = StyleSheet.create({
  listContainer: {
    padding: 16,
  },
  noRequests: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 20,
    color: "#888",
  },
});
