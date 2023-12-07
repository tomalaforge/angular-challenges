import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { City } from '../model/city.model';

@Injectable({
  providedIn: 'root',
})
export class CityStore {
  private city = new BehaviorSubject<City[]>([]);
  city$ = this.city.asObservable();

  addAll(city: City[]) {
    this.city.next(city);
  }

  addOne(City: City) {
    this.city.next([...this.city.value, City]);
  }

  deleteOne(id: number) {
    this.city.next(this.city.value.filter((s) => s.id !== id));
  }
}
