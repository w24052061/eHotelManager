import { getDatabase, ref, get, query, orderByChild, equalTo, update, push, set  } from "firebase/database";
import { database } from "@firebaseConfig";

// Fetch user role
export const fetchUserRole = async (userId: string) => {
  const db = getDatabase();
  const userRef = ref(db, `users/${userId}`);
  const snapshot = await get(userRef);
  if (snapshot.exists()) {
    return snapshot.val().role; // Assuming the role is stored directly under the user object
  } else {
    return null; // Handle case where user data may not exist
  }
};

// Fetch bookings for a specific room
export const fetchBookings = async (roomId: string) => {
  try {
    const db = getDatabase();
    const bookingsRef = ref(db, "bookings");
    const roomBookingsQuery = query(bookingsRef, orderByChild("roomId"), equalTo(roomId));
    const snapshot = await get(roomBookingsQuery);

    if (snapshot.exists()) {
      return Object.values(snapshot.val()); // Returns an array of booking objects
    }
    return [];
  } catch (error) {
    console.error("Error fetching bookings:", error);
    throw error;
  }
};

// Cancel a booking by setting status to "cancel-pending"
export async function requestCancelBooking(bookingId) {
  const bookingRef = ref(database, `bookings/${bookingId}`);
  await update(bookingRef, { status: "cancel-pending" });
}

// Service request queries by users
export async function addServiceRequest({ bookingId, userId, roomId }) {
  const servicesRef = ref(database, "services"); // Reference to "services" node
  const newServiceRef = push(servicesRef); // Create a unique key for the service request

  await set(newServiceRef, {
    bookingId,
    userId,
    roomId,
    createdAt: Date.now(),
    status: "pending",
  });

  return newServiceRef.key; // Return the unique ID of the new service request
}

// Add a complaint to the database
export async function addComplaint({ bookingId, userId, title, message }) {
  const complaintsRef = ref(database, "complaints"); // Reference to "complaints" node
  const newComplaintRef = push(complaintsRef); // Create a unique key for the complaint

  await set(newComplaintRef, {
    bookingId,
    userId,
    title,
    message,
    createdAt: Date.now(), // Use a timestamp
    status: "pending",
  });

  return newComplaintRef.key; // Return the unique ID of the new complaint
}