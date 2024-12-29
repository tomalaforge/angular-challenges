import { Component, OnInit, signal, ViewEncapsulation } from '@angular/core';
import { CityStore } from '../../data-access/city.store';
import {
  FakeHttpService,
  randomCity,
} from '../../data-access/fake-http.service';
import { City } from '../../model/city.model';
import { CardComponent } from '../../ui/card/card.component';

@Component({
  selector: 'app-city-card',
  template: `
    <app-card [list]="cities()" customClass="bg-light-purple">
      <img ngProjectAs="image" src="assets/img/city.png" width="200px" />
      <ng-template let-item>
        {{ item.name }}
        <button (click)="delete(item.id)">
          <img class="h-5" src="assets/svg/trash.svg" />
        </button>
      </ng-template>
      <button
        ngProjectAs="add"
        class="rounded-sm border border-blue-500 bg-blue-300 p-2"
        (click)="addNewItem()">
        Add
      </button>
    </app-card>
  `,
  styles: [
    `
      .bg-light-purple {
        background-color: rgba(0, 0, 250, 0.1);
      }
    `,
  ],
  encapsulation: ViewEncapsulation.None,
  imports: [CardComponent],
})
export class CityCardComponent implements OnInit {
  cities = signal<City[]>([]);

  constructor(
    private http: FakeHttpService,
    private store: CityStore,
  ) {}

  ngOnInit(): void {
    this.http.fetchCities$.subscribe((cities) => {
      this.store.addAll(cities);
    });
    this.cities = this.store.cities;
    console.log(this.cities);
  }

  addNewItem() {
    this.store.addOne(randomCity());
  }

  delete(id: number) {
    this.store.deleteOne(id);
  }
}
