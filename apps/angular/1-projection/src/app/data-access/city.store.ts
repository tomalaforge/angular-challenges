// city.store.ts
import { Injectable, signal } from '@angular/core';
import { City } from '../model/city.model';

@Injectable({
  providedIn: 'root',
})
export class CityStore {
  readonly #cities = signal<City[]>([]);
  readonly cities = this.#cities.asReadonly();

  addAll(cities: City[]) {
    this.#cities.set(cities);
  }

  addOne(city: City) {
    this.#cities.set([...this.#cities(), city]);
  }

  deleteOne(id: number) {
    this.#cities.set(this.#cities().filter((s) => s.id !== id));
  }
}
