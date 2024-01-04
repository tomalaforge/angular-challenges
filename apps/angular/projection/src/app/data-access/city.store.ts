import { Injectable, computed, signal } from '@angular/core';
import { City } from '../model/city.model';

@Injectable({
  providedIn: 'root',
})
export class CityStore {
  private _cities = signal<City[]>([]);
  cities = computed(this._cities);

  addAll(cities: City[]) {
    this._cities.set(cities);
  }

  addOne(city: City) {
    this._cities.update((value) => [...value, city]);
  }

  deleteOne(id: number) {
    this._cities.update((value) => value.filter((t) => t.id !== id));
  }
}
