import { Injectable } from '@angular/core';
import { AbstractStore } from './abstract.store';
import { City } from '../model/city.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CityStore extends AbstractStore<City> {
  public get cities$(): Observable<City[]> {
    return this.entities$;
  }
}
