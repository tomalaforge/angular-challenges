import {
  Injectable,
  Signal,
  WritableSignal,
  computed,
  signal,
} from '@angular/core';
import { City } from '../model/city.model';
import { FakeHttpService } from './fake-http.service';

@Injectable({
  providedIn: 'root',
})
export class CityStore {
  constructor(private http: FakeHttpService) {
    this.http.fetchCities$.subscribe((c) => this.addAll(c));
  }

  private cities: WritableSignal<City[]> = signal([]);
  cities$: Signal<City[]> = computed(() => this.cities());

  addAll(cities: City[]) {
    this.cities.set(cities);
  }

  addOne(city: City) {
    this.cities.update((cities) => [...cities, city]);
  }

  deleteOne(id: number) {
    this.cities.update((cities) => cities.filter((s) => s.id !== id));
  }
}
