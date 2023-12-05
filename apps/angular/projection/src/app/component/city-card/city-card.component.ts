import { Component, OnInit } from '@angular/core';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';
import { City } from '../../model/city.model';
import {
  FakeHttpService,
  randomCity,
} from '../../data-access/fake-http.service';
import { CityStore } from '../../data-access/city.store';

@Component({
  selector: 'app-city-card',
  template: `
    <app-card
      [list]="cities"
      [imgUrl]="'assets/img/city.webp'"
      (newItem)="onNewItem()">
      <ng-template #rowTemplate let-city>
        <app-list-item
          [name]="city.name"
          [id]="city.id"
          (itemDelete)="onItemDelete($event)" />
      </ng-template>
    </app-card>
  `,
  styles: [
    `
      :host {
        --card-background-color: yellow;
      }
    `,
  ],
  standalone: true,
  imports: [CardComponent, ListItemComponent],
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

  onItemDelete(id: number) {
    this.store.deleteOne(id);
  }

  onNewItem() {
    this.store.addOne(randomCity());
  }
}
