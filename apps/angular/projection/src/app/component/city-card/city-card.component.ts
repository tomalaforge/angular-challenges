import { Component, inject } from '@angular/core';
import {
  CardComponent,
  CardListItemDirective,
} from '../../ui/card/card.component';
import {
  FakeHttpService,
  randomCity,
} from '../../data-access/fake-http.service';
import { CityStore } from '../../data-access/city.store';
import { City } from '../../model/city.model';
import { ListItemComponent } from '../../ui/list-item/list-item.component';
import { toSignal } from '@angular/core/rxjs-interop';
import { switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-city-card',
  template: ` <app-card
    [list]="cities()"
    (addNewItem)="addCity()"
    class="bg-light-purple">
    <img img-header src="assets/img/city.jpg" width="200px" />

    <ng-template let-city itemList>
      <app-list-item (deleteItem)="deleteCity(city.id)">
        {{ city.name }}
      </app-list-item>
    </ng-template>
  </app-card>`,
  standalone: true,
  styles: [
    `
      .bg-light-purple {
        background-color: rgba(0, 0, 250, 0.1);
      }
    `,
  ],
  imports: [CardComponent, ListItemComponent, CardListItemDirective],
})
export class CityCardComponent {
  http: FakeHttpService = inject(FakeHttpService);
  store: CityStore = inject(CityStore);
  cities = toSignal(
    this.http.fetchCities$.pipe(
      tap((cities) => this.store.addAll(cities)),
      switchMap(() => this.store.citys$),
    ),
    { initialValue: [] as City[] },
  );

  addCity() {
    this.store.addOne(randomCity());
  }

  deleteCity(id: number) {
    this.store.deleteOne(id);
  }
}
