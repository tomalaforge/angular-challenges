import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { City } from '../model/city.model';
import { randomCity } from './fake-http.service';
import { Store } from './store';

@Injectable({
  providedIn: 'root',
})
export class CityStore extends Store {
  constructor() {
    super(new BehaviorSubject<City[]>([]));
  }

  override randItem() {
    return randomCity();
  }
}
