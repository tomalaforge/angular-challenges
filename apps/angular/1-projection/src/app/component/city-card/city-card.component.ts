import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { concatMap, tap } from 'rxjs';
import { CityStore } from '../../data-access/city.store';
import {
  FakeHttpService,
  randomCity,
} from '../../data-access/fake-http.service';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-city-card',
  template: `
    <app-card
      [list]="cities()"
      customClass="bg-light-pink"
      (addItem)="addNewItem()">
      <img src="assets/img/city.jpg" width="200px" />
      <ng-template #rowRef let-city>
        <app-list-item
          [id]="city.id"
          [name]="city.name"
          (deleteItem)="deleteItem($event)"></app-list-item>
      </ng-template>
    </app-card>
  `,
  standalone: true,
  imports: [CardComponent, ListItemComponent, AsyncPipe],
})
export class CityCardComponent {
  private store = inject(CityStore);
  private http = inject(FakeHttpService);

  cities = toSignal(
    this.http.fetchCities$.pipe(
      tap((cities) => this.store.addAll(cities)),
      concatMap(() => this.store.cities$),
    ),
    { initialValue: null },
  );

  addNewItem() {
    this.store.addOne(randomCity());
  }

  deleteItem(id: number) {
    this.store.deleteOne(id);
  }
}
