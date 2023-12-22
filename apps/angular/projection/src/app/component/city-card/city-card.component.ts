import { AsyncPipe, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CityStore } from '../../data-access/city.store';
import {
  FakeHttpService,
  randomCity,
} from '../../data-access/fake-http.service';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from './../../ui/list-item/list-item.component';

@Component({
  selector: 'app-city-card',
  template: `
    <app-card (add)="addCity()" [list]="cities$ | async">
      <img width="200px" src="assets/img/city.png" alt="city image" />

      <ng-template #rowRef let-city>
        <app-list-item (delete)="deleteCity(city.id)">
          {{ city.name }}
        </app-list-item>
      </ng-template>
    </app-card>
  `,
  standalone: true,
  imports: [NgFor, CardComponent, AsyncPipe, ListItemComponent],
})
export class CityCardComponent implements OnInit {
  constructor(
    private http: FakeHttpService,
    private cityStore: CityStore,
  ) {}

  cities$ = this.cityStore.cities$;

  ngOnInit(): void {
    this.http.fetchCities$.subscribe((city) => this.cityStore.addAll(city));
  }

  addCity() {
    this.cityStore.addOne(randomCity());
  }

  deleteCity(id: number) {
    this.cityStore.deleteOne(id);
  }
}
