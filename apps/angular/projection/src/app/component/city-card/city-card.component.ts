import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  Signal,
} from '@angular/core';

import { CityStore } from '../../data-access/city.store';
import {
  FakeHttpService,
  randomCity,
} from '../../data-access/fake-http.service';
import { City } from '../../model/city.model';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';
import { ListItemRefDirective } from '../../ui/list-item/ListItemTemplateRef.directive';

@Component({
  selector: 'app-city-card',
  template: `
    <app-card [list]="cities()" (add)="addCity()" class="bg-light-blue">
      <img src="assets/img/city.png" width="200px" />
      <ng-template listItemRef let-city>
        <app-list-item (delete)="deleteCity(city.id)">
          {{ city.name }}
        </app-list-item>
      </ng-template>
    </app-card>
  `,
  standalone: true,
  imports: [CardComponent, ListItemComponent, ListItemRefDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [
    `
      .bg-light-blue {
        background-color: rgba(0, 0, 255, 0.1);
      }
    `,
  ],
})
export class CityCardComponent implements OnInit {
  cities: Signal<City[]> = this.store.cities;

  constructor(
    private http: FakeHttpService,
    private store: CityStore,
  ) {}

  ngOnInit(): void {
    this.http.fetchCities$.subscribe((c) => this.store.addAll(c));
  }

  addCity() {
    this.store.addOne(randomCity());
  }

  deleteCity(id: number) {
    this.store.deleteOne(id);
  }
}
