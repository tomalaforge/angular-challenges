import { Component, OnInit } from '@angular/core';
import {
  FakeHttpService,
  randomCity,
} from '../../data-access/fake-http.service';
import { CardComponent } from '../../ui/card/card.component';
import { CityStore } from '../../data-access/city.store';
import { NgTemplateOutlet } from '@angular/common';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-city-card',
  template: `
    <app-card
      [list]="cities()"
      [itemRef]="cityTemplate"
      customClass="bg-light-blue">
      <img image src="/assets/img/city.png" width="200px" />
      <ng-template #cityTemplate let-city>
        <app-list-item
          [id]="city.id"
          name="{{ city.name }}"
          (deleteEvent)="deleteCity(city.id)">
        </app-list-item>
      </ng-template>

      <button
        button
        class="border border-blue-500 bg-blue-300 p-2 rounded-sm"
        (click)="addNewCity()">
        Add
      </button>
    </app-card>
  `,
  standalone: true,
  imports: [CardComponent, NgTemplateOutlet, ListItemComponent],
})
export class CityCardComponent implements OnInit {
  cities = this.store.cities;

  constructor(
    private http: FakeHttpService,
    private store: CityStore,
  ) {}

  ngOnInit(): void {
    this.http.fetchCities$.subscribe((c) => this.store.addAll(c));
  }

  addNewCity() {
    this.store.addOne(randomCity());
  }

  deleteCity(id: number) {
    this.store.deleteOne(id);
  }
}
