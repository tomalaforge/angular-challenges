import { Injectable, signal } from '@angular/core';
import { City } from '../model/city.model';

@Injectable({
  providedIn: 'root',
})
export class CityStore {
  data = signal<City[]>([]);

  addAll(data: City[]) {
    this.data.set(data);
  }

  addOne(item: City) {
    this.data.update((values) => [...values, item]);
  }

  deleteOne(id: number) {
    const newData = this.data().filter((t) => t.id !== id);

    this.data.set(newData);
  }
}
