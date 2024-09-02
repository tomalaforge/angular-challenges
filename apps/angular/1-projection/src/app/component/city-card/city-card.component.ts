import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CityStore } from '../../data-access/city.store';
import {
  FakeHttpService,
  randomCity,
} from '../../data-access/fake-http.service';
import { CardType } from '../../model/card.model';
import { City } from '../../model/city.model';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-city-card',
  template: `
    <app-card customClass="bg-light-green" [contentTemplate]="cityTemplate">
      <img card-image [src]="cityImage" width="200px" />
      <ng-template #cityTemplate>
        <app-list-item
          *ngFor="let item of cities"
          [name]="item.name"
          (deleteEvent)="delete(item.id)"></app-list-item>
      </ng-template>
      <button
        card-button
        class="rounded-sm border border-blue-500 bg-blue-300 p-2"
        (click)="addNewCity()">
        Add
      </button>
    </app-card>
  `,
  standalone: true,
  imports: [NgFor, CardComponent, ListItemComponent],
})
export class CityCardComponent implements OnInit {
  cities: City[] = [];
  cardType = CardType.CITY;
  cityImage = 'assets/img/city.png';

  constructor(
    private http: FakeHttpService,
    private store: CityStore,
  ) {}

  ngOnInit(): void {
    this.http.fetchCities$.subscribe((c) => this.store.addAll(c));
    this.store.cities$.subscribe((c) => (this.cities = c));
  }

  addNewCity() {
    this.store.addOne(randomCity());
  }

  delete(id: number) {
    this.store.deleteOne(id);
  }
}
