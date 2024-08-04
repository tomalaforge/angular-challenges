import { Component, OnInit, ViewEncapsulation } from '@angular/core';
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
    <ng-template #itemTemplate let-data="data">
      {{ data.name }}
    </ng-template>
    <app-card
      [list]="cities"
      [addNewItem]="addNewItem"
      [deleteItem]="deleteItem"
      [itemTemplate]="itemTemplate"
      customClass="bg-light-blue">
      <img src="assets/img/city.png" width="200px" />
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
  encapsulation: ViewEncapsulation.None,
  imports: [CardComponent],
})
export class CityCardComponent implements OnInit {
  cities: City[] = [];

  constructor(
    private http: FakeHttpService,
    private store: CityStore,
  ) {}

  ngOnInit(): void {
    this.http.fetchCities$.subscribe((c) => this.store.addAll(c));

    this.store.cities$.subscribe((c) => (this.cities = c));
  }

  addNewItem = () => {
    this.store.addOne(randomCity());
  };

  deleteItem = (id: number) => {
    return () => {
      this.store.deleteOne(id);
    };
  };
}
