import { getDatabase, ref, get, query, orderByChild, equalTo, update, push, set  } from "firebase/database";
import { database } from "@firebaseConfig";

// Fetch user role
export const fetchUserRole = async (userId: string) => {
  const db = getDatabase();
  const userRef = ref(db, `users/${userId}`);
  const snapshot = await get(userRef);
  if (snapshot.exists()) {
    return snapshot.val().role; 
  } else {
    return null; 
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
      return Object.values(snapshot.val()); 
    }
    return [];
  } catch (error) {
    console.error("Error fetching bookings:", error);
    throw error;
  }
};

interface CancelBookingResponse {
  success: boolean;
  message: string;
}

export async function requestCancelBooking(
  bookingId: string
): Promise<CancelBookingResponse> {
  try {
    const bookingRef = ref(database, `bookings/${bookingId}`);
    await update(bookingRef, {
      status: "cancel-pending",
      cancelRequestedAt: Date.now(), // New Update: Add the cancellation request timestamp
    });

    return { success: true, message: "Cancellation request submitted successfully." };
  } catch (error) {
    console.error("Error requesting cancellation:", error);
    return { success: false, message: "Failed to submit cancellation request." };
  }
}
// Service request queries by users
export async function addServiceRequest({ bookingId, userId, roomId }) {
  const servicesRef = ref(database, "services"); 
  const newServiceRef = push(servicesRef); 

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
    createdAt: Date.now(), 
    status: "pending",
  });

  return newComplaintRef.key; // unique ID for new complaint
}