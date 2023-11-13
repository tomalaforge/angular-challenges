import { Injectable, signal, WritableSignal } from '@angular/core';
import { City } from '../model/city.model';

@Injectable({
  providedIn: 'root',
})
export class CityStore {
  readonly cities: WritableSignal<City[]> = signal([]);

  addAll(Citys: City[]) {
    this.cities.update(() => Citys);
  }

  addOne(City: City) {
    this.cities.update((cities) => [...cities, City]);
  }

  deleteOne(id: number) {
    this.cities.update((cities) => cities.filter((city) => city.id !== id));
  }
}
