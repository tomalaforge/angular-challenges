import { inject, Injectable, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { tap } from 'rxjs';
import { City } from '../model/city.model';
import { Store } from '../model/store.model';
import { FakeHttpService, randomCity } from './fake-http.service';

@Injectable({
  providedIn: 'root',
})
export class CityStore {
  private readonly _http = inject(FakeHttpService);
  private readonly _state: Store<City, '$cities'> = {
    $cities: signal<City[]>([]),
  };

  $fetchCities = toSignal(
    this._http.fetchCities$.pipe(
      tap((t: City[]) => this._state.$cities.set(t)),
    ),
  );

  readonly $cities = this._state.$cities.asReadonly();

  addOne() {
    this._state.$cities.update((t: City[]) => [...t, randomCity()]);
  }

  deleteOne(id: number) {
    this._state.$cities.set(this.$cities().filter((t: City) => t.id !== id));
  }
}
