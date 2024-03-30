import { Injectable, signal, WritableSignal } from '@angular/core';
import { City } from '../model/city.model';

@Injectable({
  providedIn: 'root',
})
export class CityStore {
  cities: WritableSignal<City[]> = signal<City[]>([]);

  addAll(cities: City[]) {
    this.cities.set(cities);
  }

  addOne(city: City) {
    this.cities.update((cities) => [...cities, city]);
  }

  deleteOne(id: number) {
    this.cities.update((cities) => cities.filter((val) => val.id !== id));
  }
}
