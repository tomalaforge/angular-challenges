import { Injectable, signal } from '@angular/core';
import { City } from '../model/city.model';

@Injectable({
  providedIn: 'root',
})
export class CityStore {
  #cities = signal<City[]>([]);

  get cities() {
    return this.#cities.asReadonly();
  }

  addAll(cities: City[]) {
    this.#cities.set(cities);
  }

  addOne(city: City) {
    this.#cities.set(this.cities().concat(city));
  }

  deleteOne(id: number) {
    this.#cities.set(this.cities().filter((s) => s.id !== id));
  }
}
