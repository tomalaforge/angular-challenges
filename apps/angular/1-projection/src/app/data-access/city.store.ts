import { computed, Injectable } from '@angular/core';
import { City } from '../model/city.model';
import { DataStore } from './data.store';

@Injectable({
  providedIn: 'root',
})
export class CityStore extends DataStore<City> {
  constructor() {
    super();
  }

  cities = computed(() => this.entries());
}
