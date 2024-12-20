// model/Course.ts
export interface Room {
    id?: string;
    name: string;
    image: string;
    price: number;
    status: 'available' | 'booked';
  }