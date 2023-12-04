import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { City } from '../model/city.model';

@Injectable({
  providedIn: 'root',
})
export class CityStore {
  private citys = new BehaviorSubject<City[]>([]);
  citys$ = this.citys.asObservable();

  addAll(citys: City[]) {
    this.citys.next(citys);
  }

  addOne(City: City) {
    this.citys.next([...this.citys.value, City]);
  }

  deleteOne(id: number) {
    this.citys.next(this.citys.value.filter((t) => t.id !== id));
  }
}
