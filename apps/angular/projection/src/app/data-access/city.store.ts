import { DestroyRef, inject, Injectable, signal } from '@angular/core';
import { take, tap } from 'rxjs';
import { City } from '../model/city.model';
import { FakeHttpService } from './fake-http.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Injectable({ providedIn: 'root' })
export class CityStore {
  private readonly _http = inject(FakeHttpService);
  private readonly _destroyRef$ = inject(DestroyRef);

  private readonly _cities = signal<City[]>([]);

  cities = this._cities.asReadonly();

  constructor() {
    this.init();
  }

  init(): void {
    this._http.fetchCities$
      .pipe(
        tap((cities) => this.addAll(cities)),
        take(1),
        takeUntilDestroyed(this._destroyRef$),
      )
      .subscribe();
  }

  addAll(cities: City[]) {
    this._cities.set(cities);
  }

  addOne(city: City) {
    this._cities.update((cities) => [...cities, city]);
  }

  deleteOne(id: number) {
    this._cities.update((cities) => cities.filter((s) => s.id !== id));
  }
}
