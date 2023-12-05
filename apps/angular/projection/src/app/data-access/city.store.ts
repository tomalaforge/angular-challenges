import { Injectable, signal } from '@angular/core';
import { City } from '../model/city.model';

@Injectable({
  providedIn: 'root',
})
export class CityStore {
  private _cities = signal<City[]>([]);
  cities = this._cities.asReadonly();

  addAll(cities: City[]) {
    this._cities.set(cities);
  }

  addOne(city: City) {
    this._cities.update((value) => [...value, city]);
  }

  deleteOne(id: number) {
    this._cities.update((value) => value.filter((c) => c.id != id));
  }
}
