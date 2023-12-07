import { DestroyRef, inject, Injectable } from '@angular/core';
import { BehaviorSubject, take, tap } from 'rxjs';
import { City } from '../model/city.model';
import { FakeHttpService } from './fake-http.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Injectable({ providedIn: 'root' })
export class CityStore {
  private readonly _http = inject(FakeHttpService);
  private readonly _destroyRef$ = inject(DestroyRef);

  private readonly _cities$ = new BehaviorSubject<City[]>([]);

  readonly cities$ = this._cities$.asObservable();

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
    this._cities$.next(cities);
  }

  addOne(city: City) {
    this._cities$.next([...this._cities$.value, city]);
  }

  deleteOne(id: number) {
    this._cities$.next(this._cities$.value.filter((s) => s.id !== id));
  }
}
