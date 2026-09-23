// city-card.component.ts
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { randCity } from '@ngneat/falso/src/lib/city';
import { CityStore } from '../../data-access/city.store';
import { CardRowDirective } from '../card/card-row.directive';
import { CardComponent } from '../card/card.component';
import { ListItemComponent } from '../list-item/list-item.component';

@Component({
  selector: 'app-city-card',
  standalone: true,
  imports: [CardComponent, ListItemComponent, CardRowDirective],
  template: `
    <app-card [list]="cities()" customClass="bg-light-yellow">
      <img src="assets/img/city.png" width="200" height="200" alt="city" />

      <ng-template cardRow let-city>
        <app-list-item (deleted)="cityStore.deleteOne(city.id)">
          {{ city.name }}
        </app-list-item>
      </ng-template>

      <button
        class="rounded-sm border border-blue-500 bg-blue-300 p-2"
        (click)="cityStore.addOne(randCity())">
        Add
      </button>
    </app-card>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CityCardComponent {
  protected cityStore = inject(CityStore);
  protected cities = this.cityStore.cities;
  protected randCity = randCity;
}
