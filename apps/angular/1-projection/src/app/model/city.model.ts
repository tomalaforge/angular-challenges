import { CardItem } from "./card.model";

export interface City extends CardItem {
  id: number;
  name: string;
  country: string;
}
