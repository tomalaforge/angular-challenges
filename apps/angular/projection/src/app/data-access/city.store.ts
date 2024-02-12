import { Injectable, signal } from '@angular/core';
import { City } from '../model/city.model';

@Injectable({
  providedIn: 'root',
})
export class CityStore {
  cities = signal<City[]>([]);

  addAll(cities: City[]) {
    this.cities.set(cities);
  }

  addOne(city: City) {
    this.cities.update((cities) => [...cities, city]);
  }

  deleteOne(id: number) {
    this.cities.update((cities) => cities.filter((c) => c.id !== id));
  }
}
