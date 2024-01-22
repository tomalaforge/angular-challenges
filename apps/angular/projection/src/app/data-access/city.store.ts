import { Injectable, signal } from '@angular/core';
// import { BehaviorSubject } from 'rxjs';
import { City } from '../model/city.model';

@Injectable({
  providedIn: 'root',
})
export class cityStore {
  private citySignal = signal<City[]>([]);
  readonly cities = this.citySignal.asReadonly();

  addAll(cities: City[]) {
    this.citySignal.set(cities);
  }
  addOne(city: City) {
    this.citySignal.update((val) => [...val, city]);
  }
  deleteOne(id: number) {
    this.citySignal.update((val) => val.filter((city) => city.id !== id));
  }
}
