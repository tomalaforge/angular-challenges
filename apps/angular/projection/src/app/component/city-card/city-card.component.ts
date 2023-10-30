import {
  ChangeDetectionStrategy,
  Component,
  DoCheck,
  OnInit,
} from '@angular/core';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';
import { CardDirective } from '../../ui/card/card.directive';
import { CityStore } from '../../data-access/city.store';
import {
  FakeHttpService,
  randomCity,
} from '../../data-access/fake-http.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-city-card',
  template: `
    <app-card class="bg-light-blue" (addItem)="addCity()">
      <img card-header src="assets/img/city.png" width="200px" />
      <app-list-item
        *cardContent="cities$ | async; let city"
        (delete)="deleteCity(city.id)">
        {{ city.name }}
      </app-list-item>
    </app-card>
  `,
  standalone: true,
  styles: [
    `
      .bg-light-blue {
        background-color: rgba(0, 0, 250, 0.1);
      }
    `,
  ],
  imports: [CardComponent, ListItemComponent, AsyncPipe, CardDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CityCardComponent implements OnInit, DoCheck {
  cities$ = this.store.cities$;

  constructor(private http: FakeHttpService, private store: CityStore) {}

  ngOnInit(): void {
    this.http.fetchCities$.subscribe((c) => this.store.addAll(c));
  }

  ngDoCheck() {
    console.log('Checking changes on City card');
  }

  addCity() {
    this.store.addOne(randomCity());
  }

  deleteCity(id: number) {
    this.store.deleteOne(id);
  }
}
