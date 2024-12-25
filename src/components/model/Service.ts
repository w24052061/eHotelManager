export interface Service {
    id: string;
    bookingId: string;
    createdAt: number; // Unix timestamp
    roomId: string;
    status: string; // e.g., "pending", "accepted", "rejected"
    userId: string;
    serviceId: string;
  }