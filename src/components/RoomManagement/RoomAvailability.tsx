// src/components/RoomManagement/RoomAvailability.ts
import { ref, query, orderByChild, equalTo, get } from "firebase/database";
import { database } from "@firebaseConfig";

export async function isRoomAvailable(
  roomId: string,
  requestStart: string,
  requestEnd: string
): Promise<boolean> {
  const bookingRef = ref(database, "bookings");
  const roomBookingsQuery = query(
    bookingRef,
    orderByChild("roomId"),
    equalTo(roomId)
  );

  const snapshot = await get(roomBookingsQuery);
  if (!snapshot.exists()) {
    return true; // No bookings => available
  }

  const bookings = snapshot.val();
  for (const bookingId in bookings) {
    const booking = bookings[bookingId];
    const fromDate = new Date(booking.fromDate).getTime();
    const toDate = new Date(booking.toDate).getTime();

    const reqStart = new Date(requestStart).getTime();
    const reqEnd = new Date(requestEnd).getTime();

    // Overlap check
    if (reqStart <= toDate && reqEnd >= fromDate) {
      return false; // Overlap => not available
    }
  }
  return true;
}
