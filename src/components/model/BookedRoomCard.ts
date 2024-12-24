export interface BookedRoomCardProps {
    booking: {
      id: string;
      roomId: string;
      fromDate: string;
      toDate: string;
      status: string;
    };
  };