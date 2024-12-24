import { getDatabase, ref, get, query, orderByChild, equalTo } from "firebase/database";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@firebaseConfig";

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
  const bookingRef = doc(db, "bookings", bookingId);
  await updateDoc(bookingRef, { status: "cancel-pending" });
}


// Service request queries by users
export async function addServiceRequest({ bookingId, userId, roomId }) {
  const servicesRef = collection(db, "services");
  await addDoc(servicesRef, {
    bookingId,
    userId,
    roomId,
    createdAt: serverTimestamp(),
    status: "pending",
  });
}


// Add a complaint to the database
export async function addComplaint({ bookingId, userId, title, message }) {
  const complaintsRef = collection(db, "complaints");
  await addDoc(complaintsRef, {
    bookingId,
    userId,
    title,
    message,
    createdAt: serverTimestamp(),
    status: "pending"
  });
}