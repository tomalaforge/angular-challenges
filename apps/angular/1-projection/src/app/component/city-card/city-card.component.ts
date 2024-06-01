import { Component, OnInit, inject } from '@angular/core';
import { CityStore } from '../../data-access/city.store';
import {
  FakeHttpService,
  randomCity,
} from '../../data-access/fake-http.service';
import { CardComponent } from '../../ui/card/card.component';
import { RowItemDirective } from '../../ui/card/row-item.directive';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-city-card',
  template: `
    <app-card
      [list]="cities()"
      class="bg-light-yellow"
      (addItem)="onAddNewItem()">
      <img src="assets/img/city.png" width="200px" />
      <ng-template [rowItem]="cities()" let-item>
        <app-list-item
          [name]="item.name"
          (deleteItem)="onDeleteItem(item.id)"></app-list-item>
      </ng-template>
    </app-card>
  `,
  standalone: true,
  styles: [
    `
      .bg-light-yellow {
        background-color: rgba(250, 250, 0, 0.1);
      }
    `,
  ],
  imports: [CardComponent, RowItemDirective, ListItemComponent],
})
export class CityCardComponent implements OnInit {
  private http = inject(FakeHttpService);
  private store = inject(CityStore);

  cities = this.store.cities;

  ngOnInit(): void {
    this.http.fetchCities$.subscribe((c) => this.store.addAll(c));
  }

  onAddNewItem() {
    this.store.addOne(randomCity());
  }

  onDeleteItem(id: number) {
    this.store.deleteOne(id);
  }
}
