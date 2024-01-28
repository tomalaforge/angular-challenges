import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
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
      [list]="store.cities"
      customClass="bg-light-red"
      (add)="addCity()">
      <img src="assets/img/city.png" width="200px" />

      <ng-template #rowRef let-city>
        <app-list-item (delete)="deleteCity(city.id)">
          {{ city.name }}
        </app-list-item>
      </ng-template>
    </app-card>
  `,
  styles: [
    `
      ::ng-deep .bg-light-red {
        background-color: rgba(250, 0, 0, 0.1);
      }
    `,
  ],
  standalone: true,
  imports: [CardComponent, ListItemComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CityCardComponent {
  protected store = inject(CityStore);
  private http = inject(FakeHttpService);

  constructor() {
    const fetchCities = toSignal(this.http.fetchCities$, {
      initialValue: [],
    });

    effect(
      () => {
        this.store.addAll(fetchCities());
      },
      { allowSignalWrites: true },
    );
  }

  deleteCity(id: number): void {
    this.store.deleteOne(id);
  }

  addCity(): void {
    this.store.addOne(randomCity());
  }
}
