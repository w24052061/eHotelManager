// model/Course.ts
export interface Room {
  id: string;
  name: string;
  description: string;
  price: number;
  status: string;
  image?: string;  // Optional property if image might not be present for all rooms
}