import { inject, Injectable } from '@angular/core';
import { delay, Observable, of, tap } from 'rxjs';
import { cities, randomCity } from './fake.data';
import { CityStore } from './city.store';
import { City } from '../model';

@Injectable({
  providedIn: 'root',
})
export class CityService {
  cityStore = inject(CityStore);

  loadData(): Observable<City[]> {
    return of(cities).pipe(
      delay(500),
      tap((cities) => this.cityStore.addAll(cities))
    );
  }

  addCity() {
    this.cityStore.addOne(randomCity());
  }

  deleteCity(id: number) {
    this.cityStore.deleteOne(id);
  }
}
