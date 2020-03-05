import { Moment } from 'moment';

export interface IQuote {
  id?: number;
  quote?: string;
  price?: number;
  lastQuote?: Moment;
}

export class Quote implements IQuote {
  constructor(public id?: number, public quote?: string, public price?: number, public lastQuote?: Moment) {}
}
