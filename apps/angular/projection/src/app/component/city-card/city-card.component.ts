import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { CityStore } from '../../data-access/city.store';
import {
  FakeHttpService,
  randomCity,
} from '../../data-access/fake-http.service';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';
import { City } from '../../model/city.model';

@Component({
  selector: 'app-city-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-card [list]="store.cities$ | async" (add)="addCity()">
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Twemoji_1f303.svg/512px-Twemoji_1f303.svg.png"
        width="200px" />

      <ng-template #itemTemplate let-city>
        @if (typedCity(city); as city) {
          <app-list-item (delete)="deleteCity(city)">
            {{ city.name }}
          </app-list-item>
        }
      </ng-template>
    </app-card>
  `,
  imports: [CardComponent, ListItemComponent, CommonModule],
  styles: `
    :host {
      --card-background-color: rgba(0,0,255,0.1)
    }
  `,
})
export class CityCardComponent implements OnInit {
  constructor(
    private http: FakeHttpService,
    protected store: CityStore,
  ) {}

  ngOnInit(): void {
    this.http.fetchCities$.subscribe((cities) => this.store.addAll(cities));
  }

  addCity() {
    this.store.addOne(randomCity());
  }

  deleteCity(city: City) {
    this.store.deleteOne(city.id);
  }

  typedCity(city: City): City {
    return city;
  }
}
