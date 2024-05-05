import { Component, OnInit } from '@angular/core';
import { CityStore } from '../../data-access/city.store';
import {
  FakeHttpService,
  randomCity,
} from '../../data-access/fake-http.service';
import { CardType } from '../../model/card.model';
import { City } from '../../model/city.model';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-city-card',
  template: `
    <app-card
      [items]="cities"
      (addNewRow)="addNewRow()"
      customClass="bg-light-blue">
      <img img-top src="assets/img/city.png" width="200px" />

      <ng-template #rowRef let-item>
        <app-list-item (deleteItem)="deleteRow(item?.id)">
          {{ item?.name }}
        </app-list-item>
      </ng-template>
    </app-card>
  `,
  standalone: true,
  imports: [CardComponent, ListItemComponent],
})
export class CityCardComponent implements OnInit {
  cities: City[] = [];
  cardType = CardType.CITY;

  constructor(
    private http: FakeHttpService,
    private store: CityStore,
  ) {}

  ngOnInit(): void {
    this.http.fetchCities$.subscribe((s) => this.store.addAll(s));

    this.store.cities$.subscribe((c) => {
      this.cities = c;
    });
  }

  addNewRow() {
    this.store.addOne(randomCity());
  }

  deleteRow(id: number) {
    this.store.deleteOne(id);
  }
}
