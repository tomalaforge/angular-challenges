import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { tap } from 'rxjs';
import { City } from '../model/city.model';
import { FakeHttpService, randomCity } from './fake-http.service';

interface Store {
  $cities: WritableSignal<City[]>;
}

@Injectable()
export class CityStore {
  private readonly _http = inject(FakeHttpService);
  private readonly _store: Store = {
    $cities: signal<City[]>([]),
  };

  $fetchCities = toSignal(
    this._http.fetchCities$.pipe(
      tap((t: City[]) => this._store.$cities.set(t)),
    ),
  );

  readonly $cities = this._store.$cities.asReadonly();

  addOne(): void {
    this._store.$cities.update((c: City[]) => [...c, randomCity()]);
  }

  deleteOne(id: number): void {
    this._store.$cities.set(this.$cities().filter((c: City) => c.id !== id));
  }
}
