import { Injectable, signal } from '@angular/core';
import { City } from '../model/city.model';

@Injectable({
  providedIn: 'root',
})
export class CityStore {
  public cities = signal<City[]>([]);

  addAll(cities: City[]) {
    this.cities.set(cities);
    console.log('NEW STATE:', this.cities());
  }

  addOne(city: City) {
    this.cities.set([...this.cities(), city]);
    console.log('NEW STATE:', this.cities());
  }

  deleteOne(id: number) {
    this.cities.set(this.cities().filter((s) => s.id !== id));
    console.log('NEW STATE:', this.cities());
  }
}
