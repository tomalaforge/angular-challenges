// city-card.component.ts
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
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
  standalone: true,
  imports: [CardComponent, ListItemComponent, CardRowDirective],
  template: `
    <app-card [list]="cities()" customClass="bg-yellow-500/10">
      <!-- 1. Projected City Image -->
      <img src="assets/img/city.png" width="200" height="200" alt="city" />

      <!-- 2. Projected Row Template for City Name -->
      <ng-template cardRow let-city>
        <app-list-item (deleted)="deleteCity(city.id)">
          {{ city.name }}
        </app-list-item>
      </ng-template>

      <!-- 3. Projected Add Button -->
      <button
        class="rounded-sm border border-blue-500 bg-blue-300 p-2"
        (click)="addCity()">
        Add
      </button>
    </app-card>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CityCardComponent implements OnInit {
  private http = inject(FakeHttpService);
  private store = inject(CityStore);

  readonly cities = this.store.cities;

  ngOnInit(): void {
    this.http.fetchCities$.subscribe((cities) => this.store.addAll(cities));
  }

  addCity(): void {
    this.store.addOne(randomCity());
  }

  deleteCity(id: number): void {
    this.store.deleteOne(id);
  }
}
