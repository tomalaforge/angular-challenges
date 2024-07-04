import { Component, OnInit, signal } from '@angular/core';
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
    <app-card
      [list]="cities()"
      [listTemplate]="listTemplate"
      customClass="bg-light-red">
      <img ngProjectAs="image" src="assets/img/city.png" width="200px" />
      <button
        ngProjectAs="addBtn"
        class="rounded-sm border border-blue-500 bg-blue-300 p-2"
        (click)="addNewItem()">
        Add
      </button>
    </app-card>

    <ng-template #listTemplate let-item>
      <app-list-item>
        {{ item.name }}
        <button ngProjectAs="deleteBtn" (click)="delete(item.id)">
          <img class="h-5" src="assets/svg/trash.svg" />
        </button>
      </app-list-item>
    </ng-template>
  `,
  standalone: true,
  imports: [CardComponent, ListItemComponent],
})
export class CityCardComponent implements OnInit {
  cities = signal<City[]>([]);
  cardType = CardType.CITY;

  constructor(
    private http: FakeHttpService,
    private store: CityStore,
  ) {}

  ngOnInit(): void {
    this.http.fetchCities$.subscribe((t) => this.store.addAll(t));
    this.store.cities$.subscribe((t) => this.cities.set(t));
  }

  addNewItem() {
    this.store.addOne(randomCity());
  }

  delete(id: number) {
    this.store.deleteOne(id);
  }
}
