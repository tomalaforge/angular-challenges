import { Component } from '@angular/core';
import { CityStore } from '../../data-access/city.store';
import {
  FakeHttpService,
  randomCity,
} from '../../data-access/fake-http.service';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';
import { ListItemRefDirective } from '../../ui/list-item/list-item.directive';

@Component({
  selector: 'app-city-card',
  template: `
    <app-card
      [list]="cities()"
      [customClass]="'bg-light-green'"
      (addNewItem)="addNewItem()">
      <img src="assets/img/student.webp" width="200px" />
      <ng-template appListItemRef let-city>
        <app-list-item (deleteItem)="deleteItem(city.id)">
          {{ city.name }}
        </app-list-item>
      </ng-template>
    </app-card>
  `,
  standalone: true,
  styles: [
    `
      app-card {
        background-color: lightskyblue;
      }
    `,
  ],
  imports: [CardComponent, ListItemComponent, ListItemRefDirective],
})
export class CityCardComponent {
  private http = new FakeHttpService();
  private store = new CityStore();
  cities = this.store.cities;

  constructor() {
    this.http.fetchCities$.subscribe((s) => this.store.addAll(s));
  }

  addNewItem() {
    this.store.addOne(randomCity());
  }

  deleteItem(id: number) {
    this.store.deleteOne(id);
  }
}
