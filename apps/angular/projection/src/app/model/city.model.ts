import { BaseEntity } from './base-entity.model';

export interface City extends BaseEntity {
  country: string;
}
