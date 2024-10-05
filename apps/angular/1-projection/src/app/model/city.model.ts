import { Id } from './id.model';

export interface City extends Id {
  name: string;
  country: string;
}
