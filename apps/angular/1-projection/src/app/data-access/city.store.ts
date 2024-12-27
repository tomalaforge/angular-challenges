import { Injectable } from '@angular/core';
import { City } from '../model/city.model';
import { Store } from './store';

@Injectable({
  providedIn: 'root',
})
export class CityStore extends Store<City> {}
