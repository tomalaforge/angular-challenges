import { AsyncPipe } from '@angular/common';
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
  template: `<app-card [items]="cities$ | async" class="bg-light-blue">
    <img cardImage src="assets/img/city.png" width="200px" />

    <ng-template #listItemRef let-city>
      <app-list-item (deleteEvent)="deleteCity(city.id)">
        {{ city.name }} - {{ city.country }}
      </app-list-item>
    </ng-template>

    <ng-container ngProjectAs="[actions]">
      <button
        class="p-2 bg-blue-300 border border-blue-500 rounded-sm"
        (click)="addNewCity()">
        Add
      </button>
    </ng-container>
  </app-card>`,
  standalone: true,
  styles: [
    `
      .bg-light-blue {
        background-color: rgba(3, 128, 255, 1);
      }
    `,
  ],
  imports: [CardComponent, ListItemComponent, AsyncPipe],
})
export class CityCardComponent implements OnInit {
  cities$ = this.store.cities$;

  constructor(private http: FakeHttpService, private store: CityStore) {}

  ngOnInit(): void {
    this.http.fetchCities$.subscribe((cities) => this.store.addAll(cities));
  }

  addNewCity(): void {
    this.store.addOne(randomCity());
  }

  deleteCity(id: number): void {
    this.store.deleteOne(id);
  }
}
