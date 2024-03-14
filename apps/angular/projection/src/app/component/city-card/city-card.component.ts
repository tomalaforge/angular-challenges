import { NgTemplateOutlet } from '@angular/common';
import { Component, OnInit, WritableSignal, signal } from '@angular/core';
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
    <app-card [list]="cities()" customClass="rgba(0, 0, 250, 0.1)">
      <img src="assets/img/city.png" width="200px" />
      <ng-template #deleteButton let-id let-name="name">
        {{ name }}
        <button (click)="deleteCity(id)">
          <img class="h-5" src="assets/svg/trash.svg" />
        </button>
      </ng-template>
      <button
        class="rounded-sm border border-blue-500 bg-blue-300 p-2"
        (click)="addCity()">
        Add
      </button>
    </app-card>
  `,
  standalone: true,
  imports: [CardComponent, NgTemplateOutlet],
})
export class CityCardComponent implements OnInit {
  cities: WritableSignal<City[]> = signal([]);

  constructor(
    private http: FakeHttpService,
    private store: CityStore,
  ) {}

  ngOnInit(): void {
    this.http.fetchCities$.subscribe((c) => this.store.addAll(c));
    this.store.cities$.subscribe((c) => this.cities.set(c));
  }

  addCity() {
    this.store.addOne(randomCity());
  }

  deleteCity(id: number) {
    this.store.deleteOne(id);
  }
}
