import { Injectable } from '@angular/core';
import { City } from '../model/city.model';
import { BaseDataAccessStore } from './_lib/base-service-data-access-store';

@Injectable({
  providedIn: 'root',
})
export class CityStore extends BaseDataAccessStore<City> {}
