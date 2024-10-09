import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CityStore } from '../../data-access/city.store';
import {
  FakeHttpService,
  randomCity,
} from '../../data-access/fake-http.service';
import { CardRowDirective } from '../../ui/card/card-row.directive';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-city-card',
  template: `
    <app-card [list]="cities()" (add)="handleAdd()" class="bg-light-green">
      <img src="/assets/img/city.png" alt="cities with books" />

      <ng-template #rowReference [cardRow]="cities()" let-city>
        <app-list-item (remove)="handleRemove(city.id)">
          {{ city.name }}
        </app-list-item>
      </ng-template>
    </app-card>
  `,
  standalone: true,
  imports: [CardComponent, CardRowDirective, ListItemComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CityCardComponent {
  #store = inject(CityStore);
  #http = inject(FakeHttpService);

  cities = this.#store.cities;

  constructor() {
    this.#http.fetchCities$
      .pipe(takeUntilDestroyed())
      .subscribe((cities) => this.#store.addAll(cities));
  }

  handleAdd() {
    this.#store.addOne(randomCity());
  }

  handleRemove(id: number) {
    this.#store.deleteOne(id);
  }
}
