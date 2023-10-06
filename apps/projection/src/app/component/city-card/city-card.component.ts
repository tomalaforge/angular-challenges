import { Component, OnInit } from '@angular/core';
import { ListItemComponent } from '../../ui/list-item/list-item.component';
import { CardComponent } from '../../ui/card/card.component';
import { CityStore } from '../../data-access/city.store';
import {
  FakeHttpService,
  randomCity,
} from '../../data-access/fake-http.service';
import { City } from '../../model/city.model';
import { CardType } from '../../model/card.model';

@Component({
  selector: 'app-city-card',
  template: `<app-card
    [list]="cities"
    customClass="bg-light-yellow"
    (add)="addItem()">
    <img src="assets/img/cities.webp" width="200px" />
    <ng-template #rowRef let-city>
      <app-list-item
        (deleteItem)="delete(city.id)"
        [name]="city.name"></app-list-item>
    </ng-template>
  </app-card>`,
  standalone: true,
  imports: [CardComponent, ListItemComponent],
})
export class CityCardComponent implements OnInit {
  cities: City[] = [];
  cardType = CardType.CITY;

  constructor(private http: FakeHttpService, private store: CityStore) {}

  ngOnInit(): void {
    this.http.fetchCities$.subscribe((s) => this.store.addAll(s));

    this.store.cities$.subscribe((c) => (this.cities = c));
  }

  addItem() {
    this.store.addOne(randomCity());
  }

  delete(id: number) {
    this.store.deleteOne(id);
  }
}
