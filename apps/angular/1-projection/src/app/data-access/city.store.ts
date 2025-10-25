import { inject, Injectable } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { City } from '../model/city.model';
import { FakeHttpService } from './fake-http.service';

@Injectable({
  providedIn: 'root',
})
export class CityStore {
  http = inject(FakeHttpService);

  cities = rxResource({
    stream: () => this.http.fetchCities$,
    defaultValue: [],
  });

  addAll(cities: City[]) {
    this.cities.set(cities);
  }

  addOne(city: City) {
    this.cities.set([...this.cities.value(), city]);
  }

  deleteOne(id: number) {
    this.cities.set(this.cities.value().filter((s) => s.id !== id));
  }
}
