import { Entity } from './entity.model';

export interface City extends Entity {
  name: string;
  country: string;
}
