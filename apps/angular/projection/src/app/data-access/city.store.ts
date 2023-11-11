import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { City } from '../model/city.model';
import { randomCity } from './fake-http.service';
import { Store } from './store';

@Injectable({
  providedIn: 'root',
})
export class CityStore implements Store {
  private cities = new BehaviorSubject<City[]>([]);
  cities$ = this.cities.asObservable();

  addRandom(): void {
    this.addOne(randomCity());
  }

  addAll(cities: City[]) {
    this.cities.next(cities);
  }

  addOne(city: City) {
    this.cities.next([...this.cities.value, city]);
  }

  deleteOne(id: number) {
    this.cities.next(this.cities.value.filter((t) => t.id !== id));
  }
}
