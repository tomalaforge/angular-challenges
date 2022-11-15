import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { City } from '../model';

@Injectable({
  providedIn: 'root',
})
export class CityStore {
  private readonly cities = new BehaviorSubject<City[]>([]);
  readonly cities$ = this.cities.asObservable();

  addAll(cities: City[]) {
    this.cities.next(cities);
  }

  addOne(City: City) {
    this.cities.next([...this.cities.value, City]);
  }

  deleteOne(id: number) {
    this.cities.next(this.cities.value.filter((s) => s.id !== id));
  }
}
