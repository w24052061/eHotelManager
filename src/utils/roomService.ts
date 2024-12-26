import { ref, onValue } from 'firebase/database';
import { database } from '@firebaseConfig';  

export const fetchRooms = (callback: (rooms: any[]) => void) => {
  const roomsRef = ref(database, 'rooms');  
  onValue(roomsRef, (snapshot) => {
    if (snapshot.exists()) {
      const data = snapshot.val();
      const availableRooms = Object.keys(data)
        .filter((key) => data[key].status === 'available')  // Filter for rooms with 'available' status
        .map((key) => ({
          id: key,
          ...data[key],  
        }));
      callback(availableRooms);  
    } else {
      console.warn('No rooms available');
      callback([]); 
    }
  }, (error) => {
    console.error('Error fetching rooms:', error);
    callback([]); 
  });
};
