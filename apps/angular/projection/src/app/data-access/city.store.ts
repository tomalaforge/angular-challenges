import { Injectable, signal } from '@angular/core';
import { City } from '../model/city.model';

@Injectable({
  providedIn: 'root',
})
export class CityStore {
  private cities = signal<City[]>([]);

  public get cities$() {
    return this.cities;
  }

  addAll(cities: City[]) {
    this.cities.set(cities);
  }

  addOne(city: City) {
    this.cities.update(() => this.cities().concat(city));
  }

  deleteOne(id: number) {
    this.cities.update(() => this.cities().filter((s) => s.id !== id));
  }
}
