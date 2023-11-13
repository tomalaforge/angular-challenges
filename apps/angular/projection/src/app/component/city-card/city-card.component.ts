import { toSignal } from '@angular/core/rxjs-interop';
import { Component, Signal, effect, inject } from '@angular/core';
import { CardComponent } from '../../ui/card/card.component';
import {
  FakeHttpService,
  randomCity,
} from '../../data-access/fake-http.service';
import { City } from '../../model/city.model';
import { CityStore } from '../../data-access/city.store';

@Component({
  selector: 'app-city-card',
  template: `
    <app-card [list]="cities()" customClass="bg-light-green">
      <ng-template let-item="item" #listItem>
        {{ item.name }}
        <ng-container ngProjectAs="delete-button">
          <button (click)="delete(item.id)">
            <img class="h-5" src="assets/svg/trash.svg" />
          </button>
        </ng-container>
      </ng-template>

      <ng-container ngProjectAs="add-button">
        <button
          class="border border-blue-500 bg-blue-300 p-2 rounded-sm"
          (click)="add()">
          Add
        </button>
      </ng-container>
    </app-card>
  `,
  standalone: true,
  imports: [CardComponent],
})
export class CityCardComponent {
  private store = inject(CityStore);
  private fetchCities = toSignal(inject(FakeHttpService).fetchCities$, {
    initialValue: [],
  });
  cities: Signal<City[]> = this.store.cities;

  constructor() {
    effect(
      () => {
        this.store.addAll(this.fetchCities());
      },
      { allowSignalWrites: true }
    );
  }

  delete(id: number) {
    this.store.deleteOne(id);
  }

  add() {
    this.store.addOne(randomCity());
  }
}
