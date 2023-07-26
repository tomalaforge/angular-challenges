import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { City } from '../model/city.model';
import { Store } from './store.interface';

@Injectable({
  providedIn: 'root',
})
export class CityStore implements Store<City> {
  private citys = new BehaviorSubject<City[]>([]);
  citys$ = this.citys.asObservable();

  addAll(citys: City[]) {
    this.citys.next(citys);
  }

  addOne(city: City) {
    this.citys.next([...this.citys.value, city]);
  }

  deleteOne(id: number) {
    this.citys.next(this.citys.value.filter((t) => t.id !== id));
  }
}
