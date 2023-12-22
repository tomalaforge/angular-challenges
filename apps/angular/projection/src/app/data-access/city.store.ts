import { Injectable, effect } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { City } from '../model/city.model';
import { ShareStore } from './share.store';

@Injectable({
  providedIn: 'root',
})
export class CityStore extends ShareStore<City> {
  constructor() {
    super();
    const _cities = toSignal(this.http.fetchCities$, { initialValue: [] });
    effect(() => this.addAll(_cities()), { allowSignalWrites: true });
  }
}
