export interface AdminRequest {
  id: string;
  type: "cancel" | "service";
  createdAtTimestamp: number; // For bookings
  cancelRequestedAtTimestamp?: number; // For cancellations
  roomId: string;
  status: string;
  userId: string;
  bookingId?: string;
  serviceId?: string;
  fromDate?: string;
  toDate?: string;
}
