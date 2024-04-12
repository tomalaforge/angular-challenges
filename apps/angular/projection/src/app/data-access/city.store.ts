import { Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { BehaviorSubject } from 'rxjs';
import { City } from '../model/city.model';

@Injectable({
  providedIn: 'root',
})
export class CityStore {
  private citiesSubject = new BehaviorSubject<City[]>([]);
  public cities = toSignal(this.citiesSubject.asObservable());

  addAll(cities: City[]) {
    this.citiesSubject.next(cities);
  }

  addOne(student: City) {
    this.citiesSubject.next([...this.citiesSubject.value, student]);
  }

  deleteOne(id: number) {
    this.citiesSubject.next(
      this.citiesSubject.value.filter((s) => s.id !== id),
    );
  }
}
