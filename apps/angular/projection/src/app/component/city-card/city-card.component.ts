import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CardType } from '../../model/card.model';
import {
  FakeHttpService,
  randomCity,
} from '../../data-access/fake-http.service';
import { CityStore } from '../../data-access/city.store';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-city-card',
  template: `<app-card
    [list]="cities$ | async"
    (add)="addCity()"
    class="bg-light-yellow">
    <img src="assets/img/city.png" width="200px" />
    <ng-template #rowRef let-city>
      <app-list-item (delete)="deleteCity(city.id)">
        {{ city.name }}
      </app-list-item>
    </ng-template>
  </app-card>`,
  styles: [
    `
      .bg-light-yellow {
        background-color: #efefa3;
      }
    `,
  ],
  standalone: true,
  imports: [CardComponent, ListItemComponent, AsyncPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CityCardComponent implements OnInit {
  cities$ = this.store.cities$;
  cardType = CardType.CITY;

  constructor(private http: FakeHttpService, private store: CityStore) {}

  ngOnInit(): void {
    this.http.fetchCities$.subscribe((t) => this.store.addAll(t));
  }

  addCity() {
    this.store.addOne(randomCity());
  }

  deleteCity(id: number) {
    this.store.deleteOne(id);
  }
}
