// utils/seedRooms.ts
import { addRoom } from './roomService';

export const seedInitialRooms = async () => {
  const initialRooms = [
    {
      name: 'Deluxe Room with Sea View',
      image: 'https://example.com/deluxe-room.jpg',
      price: 199.99,
      status: 'available'
    },
    {
      name: 'Executive Suite',
      image: 'https://example.com/executive-suite.jpg',
      price: 299.99,
      status: 'available'
    },
    {
      name: 'Standard Room',
      image: 'https://example.com/standard-room.jpg',
      price: 129.99,
      status: 'available'
    },
    // Add more rooms as needed
  ];

  for (const room of initialRooms) {
    await addRoom(room as Room);
  }
};
