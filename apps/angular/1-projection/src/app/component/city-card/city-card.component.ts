import { NgOptimizedImage } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Signal,
} from '@angular/core';
import { CityStore } from '../../data-access/city.store';
import { City } from '../../model/city.model';
import { CardComponent } from '../../ui/card/card.component';
import { CardRowDirective } from '../../ui/card/card.directive';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-city-card',
  template: `
    <app-card
      [items]="cities()"
      (addNewItem)="cityStore.addOne()"
      class="bg-light-green">
      <img ngSrc="assets/img/student.webp" width="200" height="200" />

      <ng-template [cardRow]="cities()" let-city>
        <app-list-item (delete)="cityStore.deleteOne(city.id)">
          {{ city.name }}
        </app-list-item>
      </ng-template>
    </app-card>
  `,
  imports: [
    CardComponent,
    CardRowDirective,
    ListItemComponent,
    NgOptimizedImage,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CityCardComponent {
  readonly cityStore = inject(CityStore);

  get cities(): Signal<City[]> {
    return this.cityStore.$cities;
  }
}
