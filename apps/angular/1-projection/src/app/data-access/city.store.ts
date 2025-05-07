import { effect, inject, Injectable, signal } from '@angular/core';
import { City } from '../model/city.model';
import { FakeHttpService } from './fake-http.service';

@Injectable({
  providedIn: 'root',
})
export class CityStore {
  private readonly http = inject(FakeHttpService);
  public cities = signal<City[]>([]);

  constructor() {
    effect(() => {
      this.http.fetchCities$.subscribe((c) => this.addAll(c));
    });
  }

  addAll(cities: City[]) {
    this.cities.set(cities);
  }

  addOne(city: City) {
    this.cities.set([...this.cities(), city]);
  }

  deleteOne(id: number) {
    this.cities.set(this.cities().filter((s) => s.id !== id));
  }
}
