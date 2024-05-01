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

  addOne(student: City) {
    this.cities.update((s) => [...s, student]);
  }

  deleteOne(id: number) {
    this.cities.update((s) => s.filter((s) => s.id !== id));
  }
}
