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
    <app-card
      [list]="cities()"
      class="bg-light-blue"
      (deleteItem)="deleteCity($event)">
      <img image src="assets/img/city.png" alt="City" width="200px" />
      <button
        addButton
        class="rounded-sm border border-blue-500 bg-blue-300 p-2"
        (click)="addNewCity()">
        Add
      </button>
    </app-card>
  `,
  standalone: true,
  styles: [
    `
      .bg-light-blue {
        background-color: rgba(0, 0, 250, 0.1);
      }
    `,
  ],
  imports: [CardComponent, ListItemComponent],
})
export class CityCardComponent implements OnInit {
  cities = this.store.cities;

  constructor(
    private http: FakeHttpService,
    private store: CityStore,
  ) {}

  ngOnInit() {
    this.http.fetchCities$.subscribe((s) => this.store.addAll(s));
  }

  addNewCity() {
    this.store.addOne(randomCity());
  }

  deleteCity(id: number) {
    this.store.deleteOne(id);
  }
}
