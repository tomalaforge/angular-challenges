import { Injectable } from '@angular/core';
import { City } from '../model/city.model';
import { CrudService } from './crud.service';

@Injectable({
  providedIn: 'root',
})
export class CityStore extends CrudService<City> {
  cities = this.ressources;
}
