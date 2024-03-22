import { Injectable, computed, signal } from '@angular/core';
import { City } from '../model/city.model';

@Injectable({
  providedIn: 'root',
})
export class CityStore {
  #cities = signal<City[]>([]);
  cities = computed(this.#cities);

  addAll(cities: City[]) {
    this.#cities.update((_) => [...cities]);
  }

  addOne(city: City) {
    this.#cities.update((oldCities) => [...oldCities, city]);
  }

  deleteOne(id: number) {
    this.#cities.update((oldCities) =>
      oldCities.filter((city) => city.id !== id),
    );
  }
}
