import { Injectable, signal } from '@angular/core';
import { City } from '../model/city.model';
import { Store } from './store';

@Injectable({
  providedIn: 'root',
})
export class CityStore implements Store<City>{
  private cities = signal<City[]>([]);

  getItems = () => this.cities;

  addAll(cities: City[]) {
    this.cities.set(cities);
  }

  addOne(city: City) {
    this.cities.set([...this.cities(), city]);
  }

  deleteOne(id: number) {
    this.cities.set(this.cities().filter((s) => s.id !== id));
  }
}
