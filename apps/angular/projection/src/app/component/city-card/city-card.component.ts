import { NgOptimizedImage } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CityStore } from '../../data-access/city.store';
import {
  FakeHttpService,
  randomCity,
} from '../../data-access/fake-http.service';
import { City } from '../../model/city.model';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-city-card',
  template: `
    <app-card
      [list]="cities"
      [itemTemplate]="itemTemplate"
      backgroundClass="bg-purple-200"
      (clickedAdd)="addCity()">
      <img ngSrc="assets/img/city.png" width="200" height="200" priority />
    </app-card>

    <ng-template #itemTemplate let-item>
      <app-list-item
        [name]="item.name"
        [id]="item.id"
        (clickedRemove)="removeCity($event)" />
    </ng-template>
  `,
  standalone: true,
  imports: [NgOptimizedImage, CardComponent, ListItemComponent],
})
export class CityCardComponent implements OnInit {
  cities: City[] = [];

  constructor(
    private http: FakeHttpService,
    private store: CityStore,
  ) {}

  ngOnInit(): void {
    this.http.fetchCities$.subscribe((cities) => this.store.addAll(cities));

    this.store.cities$.subscribe((cities) => (this.cities = cities));
  }

  protected addCity() {
    this.store.addOne(randomCity());
  }

  protected removeCity(cityId: number) {
    this.store.deleteOne(cityId);
  }
}
