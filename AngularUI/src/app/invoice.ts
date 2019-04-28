import { Book } from './book';

export class Invoice {
  shippingAddress: string;
  discount: number;
  CardID: number;
  Books: Book[];
  constructor() {}
}
