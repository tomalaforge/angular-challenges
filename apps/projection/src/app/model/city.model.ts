import { Entity } from "./card.model";

export interface City extends Entity {
  name: string;
  country: string;
}
