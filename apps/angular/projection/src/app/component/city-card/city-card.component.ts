import { Component, OnInit, ViewEncapsulation, signal } from '@angular/core';
import { CardComponent } from '../../ui/card/card.component';
import { City } from '../../model/city.model';
import {
  FakeHttpService,
  randomCity,
} from '../../data-access/fake-http.service';

@Component({
  selector: 'app-city-card',
  template: `
    <app-card
      [list]="cities()"
      [itemNameTemplate]="itemNameTemplate"
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
    <ng-template #itemNameTemplate let-name="name">{{ name }}</ng-template>
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
  cities = signal<City[]>([]);

  constructor(private http: FakeHttpService) {}

  ngOnInit(): void {
    this.http.fetchCities$.subscribe((c) => this.cities.set(c));
  }

  addNewItem() {
    this.cities.update((val) => [...val, randomCity()]);
  }

  deleteItem(id: number) {
    this.cities.update((val) => val.filter((t) => t.id !== id));
  }
}
