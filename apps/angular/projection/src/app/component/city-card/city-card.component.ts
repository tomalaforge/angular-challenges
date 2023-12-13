import { NgFor, NgIf } from '@angular/common';
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
    <app-card [list]="cities" (addNew)="onAddNewItem()" class="bg-light-blue">
      <img card-image src="assets/img/city.png" width="200px" />
      <app-list-item
        *ngFor="let c of cities"
        [id]="c.id"
        (delete)="onDeleteItem($event)">
        {{ c.name }}
      </app-list-item>
    </app-card>
  `,
  standalone: true,
  styles: [
    `
      .bg-light-blue {
        background-color: rgba(173, 216, 230, 0.1);
      }
    `,
  ],
  imports: [NgIf, NgFor, CardComponent, ListItemComponent],
})
export class CityCardComponent implements OnInit {
  cities: City[] = [];
  cardType = CardType.CITY;

  constructor(
    private http: FakeHttpService,
    private store: CityStore,
  ) {}

  ngOnInit(): void {
    this.http.fetchCities$.subscribe((s) => this.store.addAll(s));

    this.store.cities$.subscribe((s) => (this.cities = s));
  }

  onAddNewItem() {
    this.store.addOne(randomCity());
  }

  onDeleteItem(id: number) {
    this.store.deleteOne(id);
  }
}
