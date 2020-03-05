export interface IProduct {
  id?: number;
  name?: string;
  price?: number;
  description?: string;
}

export class Product implements IProduct {
  constructor(public id?: number, public name?: string, public price?: number, public description?: string) {}
}
