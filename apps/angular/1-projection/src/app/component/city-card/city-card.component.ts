import { Component, OnInit } from '@angular/core';
import {
  FakeHttpService,
  randomCity,
} from '../../data-access/fake-http.service';
import { City } from '../../model/city.model';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

import { CityStore } from '../../data-access/city.store';

@Component({
  selector: 'app-city-card',
  template: `
    <ng-template #cityTemplate let-city>
      <app-list-item (deleteEventEmitter)="deleteItem(city.id)">
        <ng-container item-body>
          {{ city.name }}
        </ng-container>
      </app-list-item>
    </ng-template>
    <app-card
      [list]="cities"
      [templateRef]="cityTemplate"
      customClass="bg-light-blue">
      <ng-container card-header>
        <img src="assets/img/city.png" width="200px" />
      </ng-container>
      <ng-container card-footer>
        <button
          style="width: 100%;"
          class="rounded-sm border border-blue-500 bg-blue-300 p-2"
          (click)="addItem()">
          Add
        </button>
      </ng-container>
    </app-card>
  `,
  styles: [
    `
      ::ng-deep .bg-light-blue {
        background-color: rgba(0, 0, 250, 0.1);
      }
    `,
  ],
  imports: [CardComponent, ListItemComponent],
  standalone: true,
})
export class CityCardComponent implements OnInit {
  cities: City[] = [];

  constructor(
    private http: FakeHttpService,
    private store: CityStore,
  ) {}

  ngOnInit(): void {
    this.http.fetchCities$.subscribe((t) => this.store.addAll(t));

    this.store.elements$.subscribe((t) => (this.cities = t));
  }

  addItem(): void {
    const item: City = randomCity();
    this.store.addOne(item);
  }

  deleteItem(id: number): void {
    this.store.deleteOne(id);
  }
}
