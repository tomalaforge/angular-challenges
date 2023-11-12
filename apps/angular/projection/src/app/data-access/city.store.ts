import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { City } from '../model/city.model';

@Injectable({
  providedIn: 'root',
})
export class CityStore {
  private cities = new BehaviorSubject<City[]>([]);
  cities$ = this.cities.asObservable();

  addAll(Citys: City[]) {
    this.cities.next(Citys);
  }

  addOne(City: City) {
    this.cities.next([...this.cities.value, City]);
  }

  deleteOne(id: number) {
    this.cities.next(this.cities.value.filter((t) => t.id !== id));
  }
}
