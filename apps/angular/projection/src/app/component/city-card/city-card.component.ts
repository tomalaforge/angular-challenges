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
    <app-card [list]="cities" (addItem)="addItem()" class="bg-light-green">
      <img src="assets/img/city.png" width="200px" />
      <ng-template #templateRef let-city>
        <app-list-item [id]="city.id" (deleteItem)="deleteItem(city.id)">
          {{ city.name }}
        </app-list-item>
      </ng-template>
    </app-card>
  `,
  standalone: true,
  imports: [CardComponent, ListItemComponent],
  styles: [
    `
      .bg-light-green {
        background-color: rgba(0, 250, 0, 0.1);
      }
    `,
  ],
})
export class CityCardComponent implements OnInit {
  cities: City[] = [];

  constructor(
    private http: FakeHttpService,
    private store: CityStore,
  ) {}

  ngOnInit(): void {
    this.http.fetchCities$.subscribe((s) => this.store.addAll(s));

    this.store.cities$.subscribe((s) => (this.cities = s));
  }

  addItem() {
    this.store.addOne(randomCity());
  }

  deleteItem(cityId: number) {
    this.store.deleteOne(cityId);
  }
}
