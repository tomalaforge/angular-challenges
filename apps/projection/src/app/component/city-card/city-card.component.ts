import { Component, OnInit } from '@angular/core';
import { CityStore } from '../../data-access/city.store';
import {
  FakeHttpService,
  randomCity,
} from '../../data-access/fake-http.service';
import { ICardComponent } from '../../model/card-component';
import { City } from '../../model/city.model';
import { CardComponent } from '../../ui/card/card.component';

@Component({
  selector: 'app-city-card',
  template: ` <ng-template #cityTemplate let-city>
      <label>{{ city.name }}</label>
    </ng-template>
    <app-card
      [list]="cities"
      [optionTemplate]="cityTemplate"
      (addItem)="addNewItem()"
      (deleteItem)="deleteItem($event)"
      customClass="bg-light-blue">
      <img src="assets/img/city.jpg" width="200px" cardContent
    /></app-card>`,
  standalone: true,
  imports: [CardComponent],
})
export class CityCardComponent implements OnInit, ICardComponent {
  cities: City[] = [];
  constructor(private http: FakeHttpService, private store: CityStore) {}

  ngOnInit(): void {
    this.http.fetchCities$.subscribe((c) => this.store.addAll(c));

    this.store.cities$.subscribe((c) => (this.cities = c));
  }

  addNewItem() {
    this.store.addOne(randomCity());
  }

  deleteItem(id: number) {
    this.store.deleteOne(id);
  }
}
