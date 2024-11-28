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
    <ng-template #cityTemaplte let-city>
      <app-list-item (itemDeleted)="onDeleteCity(city.id)">
        <div item-body>{{ city.name }}</div>
      </app-list-item>
    </ng-template>
    <app-card [customTemplate]="cityTemaplte" [items]="cities">
      <div card-header>
        <img src="assets/img/city.png" width="200px" />
      </div>
      <div card-footer>
        <button
          style="width: 100%;"
          class="rounded-sm border border-blue-500 bg-blue-300 p-2"
          (click)="onAddCity()">
          Add
        </button>
      </div>
    </app-card>
  `,
  standalone: true,
  styles: [
    `
      :host {
        --card-background: lightyellow;
      }
    `,
  ],
  imports: [CardComponent, ListItemComponent],
})
export class CityCardComponent implements OnInit {
  cities: City[] = [];

  constructor(
    private store: CityStore,
    private http: FakeHttpService,
  ) {}

  ngOnInit(): void {
    this.http.fetchCities$.subscribe((c) => this.store.addAll(c));

    this.store.cities$.subscribe((c) => (this.cities = c));
  }

  onAddCity() {
    const city = randomCity();
    this.store.addOne(city);
  }

  onDeleteCity(id: number) {
    this.store.deleteOne(id);
  }
}
