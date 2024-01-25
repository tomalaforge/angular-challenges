import { Component, OnInit } from '@angular/core';
import { CityStore } from '../../data-access/city.store';
import {
  FakeHttpService,
  randomCity,
} from '../../data-access/fake-http.service';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-city-card',
  template: `
    <app-card [list]="cities()" customClass="bg-light-blue">
      <img cardImage src="assets/img/city.png" width="200px" />

      <ng-template #genericTemplate let-city>
        <app-list-item
          [id]="city.id"
          name="{{ city.name }}"
          (deleteEvent)="deleteCity(city.id)"></app-list-item>
      </ng-template>

      <button
        button
        class="rounded-sm border border-blue-500 bg-blue-300 p-2"
        (click)="addNewItem()">
        Add
      </button>
    </app-card>
  `,
  standalone: true,
  imports: [CardComponent, ListItemComponent],
})
export class CityCardComponent implements OnInit {
  cities = this.store.cities;
  constructor(
    private http: FakeHttpService,
    private store: CityStore,
  ) {}

  ngOnInit(): void {
    this.http.fetchCities$.subscribe((t) => this.store.addAll(t));
  }

  addNewItem() {
    this.store.addOne(randomCity());
    console.log(this.store);
  }

  deleteCity(id: number) {
    this.store.deleteOne(id);
  }
}
