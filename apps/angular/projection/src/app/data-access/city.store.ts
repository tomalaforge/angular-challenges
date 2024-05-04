import { Injectable, signal } from '@angular/core';
import { City } from '../model/city.model';

@Injectable({
  providedIn: 'root',
})
export class CityStore {
  readonly cities = signal<City[]>([]);

  addAll(cities: City[]) {
    this.cities.set(cities);
  }

  addOne(city: City) {
    this.cities.update((c) => [...c, city]);
  }

  deleteOne(id: number) {
    this.cities.update((c) => c.filter((c) => c.id !== id));
  }
}
