import { Injectable } from '@angular/core';
import { City } from '../model/city.model';
import { DataStoreBase } from '../shared';

@Injectable({
  providedIn: 'root',
})
export class CityStore extends DataStoreBase<City> {}
