import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CardComponent } from '../../ui/card/card.component';
import { City } from '../../model/city.model';
import { CityStore } from '../../data-access/city.store';
import {
  FakeHttpService,
  randomCity,
} from '../../data-access/fake-http.service';

@Component({
  selector: 'app-city-card',
  template: `
    <app-card
      [list]="cities"
      itemName="name"
      (deleteItem)="deleteItem($event)"
      customClass="bg-light-blue">
      <img cardImage src="assets/img/city.jpeg" width="200px" />
      <button
        addButton
        class="border border-blue-500 bg-blue-300 p-2 rounded-sm"
        (click)="addNewItem()">
        Add
      </button>
    </app-card>
  `,
  styles: [
    `
      .bg-light-blue {
        background-color: rgba(250, 100, 200, 0.1);
      }
    `,
  ],
  standalone: true,
  imports: [CardComponent],
  encapsulation: ViewEncapsulation.None,
})
export class CityCardComponent implements OnInit {
  cities: City[] = [];

  constructor(private http: FakeHttpService, private store: CityStore) {}

  ngOnInit(): void {
    this.http.fetchCities$.subscribe((t) => this.store.addAll(t));

    this.store.cities$.subscribe((t) => (this.cities = t));
  }

  addNewItem() {
    this.store.addOne(randomCity());
  }

  deleteItem(event: number) {
    this.store.deleteOne(event);
  }
}
