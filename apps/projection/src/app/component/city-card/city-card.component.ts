import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { CityStore } from '../../data-access/city.store';
import {
  FakeHttpService,
  randomCity,
} from '../../data-access/fake-http.service';
import { Item } from '../../model/item.model';
import { CardComponent } from '../../ui/card/card.component';

@Component({
  selector: 'app-city-card',
  template: `<app-card
    [items]="cityItems"
    customClass="bg-light-blue"
    (_addNewItem)="addNewCity()"
    (_deleteItem)="deleteCity($event)">
    <img src="assets/img/city.png" width="200px" />
  </app-card>`,
  standalone: true,
  imports: [CardComponent],
})
export class CityCardComponent implements OnInit {
  cityItems: Item[] = [];
  constructor(private http: FakeHttpService, private store: CityStore) {}

  ngOnInit(): void {
    this.http.fetchCities$.subscribe((c) => this.store.addAll(c));

    this.store.cities$
      .pipe(
        map((cities) =>
          cities.map(
            (c) => ({ name: `${c.name}, ${c.country}`, id: c.id } as Item)
          )
        )
      )
      .subscribe((items) => (this.cityItems = items));
  }

  addNewCity(): void {
    this.store.addOne(randomCity());
  }

  deleteCity(id: number): void {
    this.store.deleteOne(id);
  }
}
