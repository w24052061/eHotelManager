export interface Booking {
  id: string;
  roomId: string;
  userId: string;
  fromDate: string;
  toDate: string;
  email: string;
  status: 'cancel-pending' | 'cancel-accepted' | 'cancel-rejected' | 'Available' | '';
  createdAt: number; // Unix timestamp in milliseconds
  cancelRequestedAt?: number; // Optional, Unix timestamp
}

export interface User {
  id: string;
  name: string;
  surname: string;
  email: string;
  mobile: string;
  gender: string;
  role: 'admin' | 'staff' | 'user'; // Adjust roles as needed
  createdAt: string; // ISO string
}