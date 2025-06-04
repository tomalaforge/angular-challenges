import { IModel } from './base.model';

export interface City extends IModel {
  name: string;
  country: string;
}
