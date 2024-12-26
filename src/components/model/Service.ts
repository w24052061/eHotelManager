export interface Service {
    id: string;
    bookingId: string;
    createdAt: number; 
    roomId: string;
    status: string; // "pending"|"accepted"|"rejected"
    userId: string;
    serviceId: string;
  }