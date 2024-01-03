import { Component, OnInit } from '@angular/core';
import { CityStore } from '../../data-access/city.store';
import {
  FakeHttpService,
  randomCity,
} from '../../data-access/fake-http.service';
import {
  CardComponent,
  CardListItemDirective,
} from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-city-card',
  template: `
    <app-card
      customClass="bg-light-blue"
      [list]="cities()"
      (addItem)="addNewItem()">
      <img src="assets/img/city.png" width="200px" image />

      <ng-template cardListItem let-city>
        <app-list-item (deleteItem)="onDeleteItem(city.id)">
          <p>{{ city.name }}</p>
        </app-list-item>
      </ng-template>
    </app-card>
  `,
  standalone: true,
  imports: [CardComponent, ListItemComponent, CardListItemDirective],
})
export class CityCardComponent implements OnInit {
  cities = this.cityStore.cities;
  constructor(
    private http: FakeHttpService,
    private cityStore: CityStore,
  ) {}

  ngOnInit(): void {
    this.http.fetchCities$.subscribe((s) => this.cityStore.addAll(s));
  }

  addNewItem() {
    this.cityStore.addOne(randomCity());
  }

  onDeleteItem(id: number) {
    this.cityStore.deleteOne(id);
  }
}
