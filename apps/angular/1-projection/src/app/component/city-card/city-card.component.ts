import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CityStore } from '../../data-access/city.store';
import { randomCity } from '../../data-access/fake-http.service';
import { CardType } from '../../model/card.model';
import { City } from '../../model/city.model';
import { CardItemDirective } from '../../ui/card/card-item-context.directive';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-city-card',
  template: `
    <app-card [list]="cities.value()" (onAddNewItem)="addNewCity()">
      <img ngSrc="assets/img/city.png" width="200" height="200" />

      <ng-template [appCardItem]="_cityType" #itemTemplate let-item>
        <app-list-item
          [name]="item.name"
          [id]="item.id"
          [type]="cardType"
          (onDeleteItem)="deleteCity(item.id)"></app-list-item>
      </ng-template>
    </app-card>
  `,
  imports: [
    CardComponent,
    NgOptimizedImage,
    ListItemComponent,
    CardItemDirective,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CityCardComponent {
  private store = inject(CityStore);
  readonly _cityType!: City;

  cities = this.store.cities;
  cardType = CardType.CITY;

  addNewCity() {
    this.store.addOne(randomCity());
  }

  deleteCity(id: number) {
    this.store.deleteOne(id);
  }
}
