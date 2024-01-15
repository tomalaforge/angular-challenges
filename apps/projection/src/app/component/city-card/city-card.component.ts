import { Component, inject } from '@angular/core';
import { City } from '../../model/city.model';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';
import { CardListItemDirective } from '../../ui/card/card-list-item.directive';
import {
  FakeHttpService,
  randomCity,
} from '../../data-access/fake-http.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { CityStore } from '../../data-access/city.store';
import { switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-city-card',
  template: `<app-card
    [list]="cities()"
    class="bg-light-blue"
    (addedItem)="addNewCity()">
    <img image src="assets/img/city.png" width="200px" />
    <ng-template appCardListItem let-item>
      <app-list-item (deletedItem)="deleteCity(item.id)">
        <div description>
          {{ item.name }}
        </div>
      </app-list-item></ng-template
    ></app-card
  > `,
  standalone: true,
  styles: [
    `
      .bg-light-blue {
        background-color: rgba(0, 0, 250, 0.1);
      }
    `,
  ],
  imports: [CardComponent, ListItemComponent, CardListItemDirective],
})
export class CityCardComponent {
  http = inject(FakeHttpService);
  store = inject(CityStore);

  cities = toSignal(
    this.http.fetchCities$.pipe(
      tap((cities) => {
        this.store.addAll(cities);
      }),
      switchMap(() => {
        return this.store.cities$;
      })
    ),
    { initialValue: [] as City[] }
  );

  addNewCity(): void {
    this.store.addOne(randomCity());
  }

  deleteCity(id: number) {
    this.store.deleteOne(id);
  }
}
