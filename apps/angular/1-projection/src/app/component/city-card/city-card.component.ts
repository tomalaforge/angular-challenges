import { Component } from '@angular/core';
import { CityStore } from '../../data-access/city.store';
import { randomCity } from '../../data-access/fake-http.service'; // Use randomCity as defined
import { City } from '../../model/city.model';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';
import { BaseCardComponent } from '../_lib/base-card.directive';

import { NgOptimizedImage } from '@angular/common';
import { BaseDataAccessStore } from '../../data-access/_lib/base-service-data-access-store';
import { CardActionsDirective } from '../../ui/card/card-actions.directive';
import { CardHeaderDirective } from '../../ui/card/card-header.directive';
import { ListItemActionsDirective } from '../../ui/list-item/list-item-actions.directive';

@Component({
  selector: 'app-city-card',
  template: `
    <app-card [list]="items()" [itemTpl]="itemTpl" customClass="bg-light-green">
      <img
        appCardHeader
        ngSrc="assets/img/city.png"
        width="200"
        height="200"
        alt="City Icon" />

      <ng-template #itemTpl let-city>
        <app-list-item>
          {{ city.name }} - {{ city.country }}
          <button
            appListItemActions
            (click)="removeItem(city.id)"
            class="h-5 w-5">
            <img src="assets/svg/trash.svg" alt="Delete City" />
          </button>
        </app-list-item>
      </ng-template>

      <button
        appCardActions
        class="rounded-sm border border-blue-500 bg-blue-300 p-2"
        (click)="addNewItem()">
        Add City
      </button>
    </app-card>
  `,
  imports: [
    CardComponent,
    ListItemComponent,
    CardHeaderDirective,
    CardActionsDirective,
    ListItemActionsDirective,
    NgOptimizedImage,
  ],
  providers: [
    {
      provide: BaseDataAccessStore,
      useClass: CityStore,
    },
  ],
  standalone: true,
})
export class CityCardComponent extends BaseCardComponent<City> {
  override randMethod = () => randomCity();
  override httpItems$ = this.http.fetchCities$;
}
