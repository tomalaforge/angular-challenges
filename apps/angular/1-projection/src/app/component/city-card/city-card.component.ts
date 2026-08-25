import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
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
    <app-card
      class="bg-light-blue"
      [items]="cities()"
      (addNew)="handleAddNew()">
      <img src="assets/img/city.png" alt="city" width="200px" />
      <ng-template [cardRow]="cities()" let-city>
        <app-list-item (delete)="handleDelete(city.id)">
          {{ city.name }}
        </app-list-item>
      </ng-template>
    </app-card>
  `,
  styles: [
    `
      .bg-light-blue {
        background-color: rgba(0, 0, 250, 0.1);
      }
    `,
  ],
  imports: [CardComponent, ListItemComponent, CardRowDirective],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CityCardComponent {
  private http = inject(FakeHttpService);
  private store = inject(CityStore);

  cities = this.store.cities;

  constructor() {
    this.http.fetchCities$.subscribe(this.store.addAll);
  }

  handleAddNew(): void {
    this.store.addOne(randomCity());
  }

  handleDelete(id: number): void {
    this.store.deleteOne(id);
  }
}
