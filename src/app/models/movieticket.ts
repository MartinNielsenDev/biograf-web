export class MovieTicket {
  id: number;
  isPaid: boolean;
  userId: number;
  show: {
    time: number;
    title: string;
    length: number;
    theater: string;
  };
  seats: number[];
}
