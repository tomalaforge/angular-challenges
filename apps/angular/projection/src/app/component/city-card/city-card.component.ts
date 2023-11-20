import { Component, Signal, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { switchMap, tap } from 'rxjs';
import { CityStore } from '../../data-access/city.store';
import {
  FakeHttpService,
  randomCity,
} from '../../data-access/fake-http.service';
import { City } from '../../model/city.model';
import {
  CardComponent,
  CardListItemDirective,
} from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-city-card',
  template: `<app-card
    [list]="cities()"
    class="bg-light-blue"
    (add)="addCity()">
    <img card-header src="assets/img/city.jpeg" width="200px" />
    <ng-template card-list-item let-city>
      <app-list-item (deleted)="deleteCity(city.id)">
        {{ city.name }}
      </app-list-item>
    </ng-template>
  </app-card>`,

  styles: [
    `
      .bg-light-blue {
        background-color: rgba(0, 96, 250, 0.1);
      }
    `,
  ],
  standalone: true,
  imports: [CardComponent, ListItemComponent, CardListItemDirective],
})
export class CityCardComponent {
  http = inject(FakeHttpService);
  store = inject(CityStore);

  cities: Signal<City[]> = toSignal(
    this.http.fetchCities$.pipe(
      tap((cities: City[]) => this.store.addAll(cities)),
      switchMap(() => this.store.cities$)
    ),
    {
      initialValue: [] as City[],
    }
  );

  addCity() {
    this.store.addOne(randomCity());
  }

  deleteCity(id: number) {
    this.store.deleteOne(id);
  }
}
