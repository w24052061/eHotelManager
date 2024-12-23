import { getDatabase, ref, get, query, orderByChild, equalTo } from "firebase/database";

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
