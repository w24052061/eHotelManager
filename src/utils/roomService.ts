// roomService.ts
import { ref, onValue } from 'firebase/database';
import { database } from '@firebaseConfig';  // Import Firebase configuration

export const fetchRooms = (callback: (rooms: any[]) => void) => {
  const roomsRef = ref(database, 'rooms');  // Reference to the 'rooms' node
  onValue(roomsRef, (snapshot) => {
    if (snapshot.exists()) {
      const data = snapshot.val();
      const availableRooms = Object.keys(data)
        .filter((key) => data[key].status === 'available')  // Filter for rooms with 'available' status
        .map((key) => ({
          id: key,
          ...data[key],  // Map the data to the required format
        }));
      callback(availableRooms);  // Pass the rooms data to the callback function
    } else {
      console.warn('No rooms available');
      callback([]);  // Return an empty array if no rooms are found
    }
  }, (error) => {
    console.error('Error fetching rooms:', error);
    callback([]);  // Return an empty array on error
  });
};
