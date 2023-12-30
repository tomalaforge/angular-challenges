import { Component, OnInit } from '@angular/core';
import { CityStore } from '../../data-access/city.store';
import {
  FakeHttpService,
  randomCity,
} from '../../data-access/fake-http.service';
import { City } from '../../model/city.model';
import {
  CardComponent,
  CardListItemDirective,
} from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-city-card',
  template: `
    <app-card [list]="cities" customClass="bg-light-blue">
      <img src="assets/img/city.png" width="200px" image />

      <ng-template cardListItem let-city>
        <app-list-item
          [name]="city.name"
          [id]="city.id"
          (deleteItem)="onDeleteItem($event)"></app-list-item>
      </ng-template>

      <button
        class="rounded-sm border border-blue-500 bg-blue-300 p-2"
        (click)="addNewItem()">
        Add
      </button>
    </app-card>
  `,
  standalone: true,
  imports: [CardComponent, ListItemComponent, CardListItemDirective],
})
export class CityCardComponent implements OnInit {
  cities: City[] = [];
  constructor(
    private http: FakeHttpService,
    private cityStore: CityStore,
  ) {}

  ngOnInit(): void {
    this.http.fetchCities$.subscribe((s) => this.cityStore.addAll(s));

    this.cityStore.cities$.subscribe((s) => (this.cities = s));
  }

  addNewItem() {
    this.cityStore.addOne(randomCity());
  }

  onDeleteItem(id: number) {
    this.cityStore.deleteOne(id);
  }
}
