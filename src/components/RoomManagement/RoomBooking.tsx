import { ref, push } from "firebase/database";
import { isRoomAvailable } from "@/components/RoomManagement/RoomAvailability";
import { database } from "@firebaseConfig";

export async function createBooking(roomId, fromDate, toDate, userId) {
  const available = await isRoomAvailable(roomId, fromDate, toDate);

  if (!available) {
    return {
      success: false,
      message: "Room is not available for the selected dates.",
    };
  }

  const bookingsRef = ref(database, "bookings");
  const newBooking = {
    roomId,
    fromDate,
    toDate,
    userId,
  };

  await push(bookingsRef, newBooking);
  return { success: true, message: "Booking successful!" };
}
