import { Injectable, signal } from '@angular/core';
import { City } from '../model/city.model';

@Injectable({
  providedIn: 'root',
})
export class CityStore {
  private _cities = signal<City[]>([]);

  get cities(): City[] {
    return this._cities();
  }

  addAll(cities: City[]) {
    this._cities.set(cities);
  }

  addOne(student: City) {
    this._cities.set([...this._cities(), student]);
  }

  deleteOne(id: number) {
    this._cities.set(this._cities().filter((city) => city.id !== id));
  }
}
