import { Subjects } from './subjects';

export interface TicketCreatedInterface {
  subject: Subjects;
  data: {
    id: string;
    title: string;
    price: number;
  };
}
