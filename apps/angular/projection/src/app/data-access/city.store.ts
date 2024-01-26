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

  addOne(student: City) {
    this.cities.update((x) => [...x, student]);
  }

  deleteOne(id: number) {
    this.cities.update((x) => x.filter((x) => x.id !== id));
  }
}
