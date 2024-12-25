export interface Complaint {
    id: string;
    bookingId: string;
    createdAt: number;
    message: string;
    status: string;
    title: string;
    userId: string;
  }