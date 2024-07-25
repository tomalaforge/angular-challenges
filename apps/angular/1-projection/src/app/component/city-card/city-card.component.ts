import { Component, inject, OnInit } from '@angular/core';
import { ListItemComponent } from '../../ui/list-item/list-item.component';
import { CardComponent } from '../../ui/card/card.component';
import { City } from '../../model/city.model';
import { FakeHttpService, randomCity } from '../../data-access/fake-http.service';
import { CityStore } from '../../data-access/city.store';

@Component({
  selector: 'app-city-card',
  template: `<app-card
  [list]="cities"
  [imgTemplate]="cityImg"
  [itemTemplate]="cityItem"
  [actionTemplate]="cityAction">
</app-card>
<ng-template #cityImg>
  <img src="assets/img/city.png" width="200px" />
</ng-template>
<ng-template let-item #cityItem>
  <app-list-item 
    [name]="item.name"
    [id]="item.id"
    (deleteItemEvent)="deleteItem($event)">
  </app-list-item>
</ng-template>
<ng-template #cityAction>
  <button
    class="rounded-sm border border-blue-500 bg-blue-300 p-2"
    (click)="addNewItem()">
    Add
  </button>
</ng-template>`,
  standalone: true,
  styles: [
    ` app-card {
      --bgColor: #adff2f;
      }
    `,
  ],
  imports: [ListItemComponent, CardComponent],
})
export class CityCardComponent implements OnInit {
  cities: City[] = [];
  http = inject(FakeHttpService);
  store = inject(CityStore);

  ngOnInit(): void {
    this.http.fetchCities$.subscribe((s) => this.store.addAll(s));
    this.store.cities$.subscribe((s) => (this.cities = s));
  }

  addNewItem() {
    this.store.addOne(randomCity());
  }

  deleteItem(id: number) {
    this.store.deleteOne(id);
  }
}
