import { Injectable } from '@angular/core';
import { City } from '../model/city.model';
import { BaseStore } from './base.store';

@Injectable({
  providedIn: 'root',
})
export class CityStore extends BaseStore<City> {}
