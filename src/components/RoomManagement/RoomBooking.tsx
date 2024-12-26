import { ref, push } from "firebase/database";
import { database } from "@firebaseConfig";

export async function addBooking({
  roomId,
  userId,
  fromDate,
  toDate,
  email,
}: {
  roomId: string;
  userId: string;
  fromDate: string;
  toDate: string;
  email: string;
}): Promise<{ success: boolean; message: string }> {
  try {
    const bookingsRef = ref(database, "bookings");
    const newBooking = {
      roomId,
      userId,
      fromDate,
      toDate,
      email,
      createdAt: Date.now(), // Add createdAt as a timestamp in milliseconds
    };

    await push(bookingsRef, newBooking);

    return { success: true, message: "Booking successful!" };
  } catch (error) {
    console.error("Error adding booking:", error);
    return { success: false, message: "Failed to book room." };
  }
}
