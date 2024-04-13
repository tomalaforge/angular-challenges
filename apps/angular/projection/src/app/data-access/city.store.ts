import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { City } from '../model/city.model';
import { DeleteService } from './delete-service';

@Injectable({
  providedIn: 'root',
})
export class CityStore implements DeleteService {
  private cities = new BehaviorSubject<City[]>([]);
  cities$ = this.cities.asObservable();

  addAll(cities: City[]) {
    this.cities.next(cities);
  }

  addOne(student: City) {
    this.cities.next([...this.cities.value, student]);
  }

  deleteOne(id: number) {
    this.cities.next(this.cities.value.filter((s) => s.id !== id));
  }
}
