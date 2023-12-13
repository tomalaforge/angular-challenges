import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { City } from '../model/city.model';

@Injectable({
  providedIn: 'root',
})
export class CityStore {
  private cities = new BehaviorSubject<City[]>([]);

  public cities$ = this.cities.asObservable();

  public addAll(cities: City[]): void {
    this.cities.next(cities);
  }

  public addOne(city: City): void {
    this.cities.next([...this.cities.value, city]);
  }

  public deleteOne(id: number): void {
    this.cities.next(
      this.cities.value.filter((c: City): boolean => c.id !== id),
    );
  }
}
