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

  addOne(student: City) {
    this.#cities.set([...this.cities(), student]);
  }

  deleteOne(id: number) {
    console.log(id);
    this.#cities.set(this.cities().filter((s) => s.id !== id));
  }
}
