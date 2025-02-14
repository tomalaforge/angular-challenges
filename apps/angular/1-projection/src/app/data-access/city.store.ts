import { inject, Injectable, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { tap } from 'rxjs';
import { City } from '../model/city.model';
import { FakeHttpService, randomCity } from './fake-http.service';

@Injectable({
  providedIn: 'root',
})
export class CityStore {
  private readonly http = inject(FakeHttpService);

  private _cities = signal<City[]>([]);
  public cities = this._cities.asReadonly();

  fetchCities = toSignal(
    this.http.fetchCities$.pipe(tap((cities) => this._cities.set(cities))),
  );

  addOne() {
    this._cities.set([...this._cities(), randomCity()]);
  }

  deleteOne(id: number) {
    this._cities.set(this._cities().filter((s) => s.id !== id));
  }
}
