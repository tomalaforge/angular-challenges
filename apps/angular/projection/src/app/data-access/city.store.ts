import { Injectable, signal } from '@angular/core';
import { City } from '../model/city.model';

@Injectable({
  providedIn: 'root',
})
export class CityStore {
  public cities = signal<City[]>([]);

  public addAll(city: City[]) {
    this.cities.set(city);
  }

  public addOne(city: City) {
    this.cities.update((cities) => [...cities, city]);
  }

  public deleteOne(id: number) {
    this.cities.update((cities) => cities.filter((t) => t.id !== id));
  }
}
