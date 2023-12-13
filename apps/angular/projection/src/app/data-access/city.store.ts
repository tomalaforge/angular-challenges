import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { City } from '../model/city.model';
import { IStore } from './IStore';

@Injectable({
  providedIn: 'root',
})
export class CityStore implements IStore<City> {
  private Cities = new BehaviorSubject<City[]>([]);
  cities$ = this.Cities.asObservable();

  addAll(Cities: City[]) {
    this.Cities.next(Cities);
  }

  addOne(City: City) {
    this.Cities.next([...this.Cities.value, City]);
  }

  deleteOne(id: number) {
    this.Cities.next(this.Cities.value.filter((t) => t.id !== id));
  }
}
