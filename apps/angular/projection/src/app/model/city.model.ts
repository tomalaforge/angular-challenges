import { CardModel } from './card-model';

export class City implements CardModel {
  id!: number;
  name!: string;
  country!: string;

  get displayName(): string {
    return this.name;
  }
}
