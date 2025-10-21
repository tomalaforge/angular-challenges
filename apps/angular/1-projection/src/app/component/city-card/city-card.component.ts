import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CityStore } from '../../data-access/city.store';
import {
  FakeHttpService,
  randomCity,
} from '../../data-access/fake-http.service';
import { CardType } from '../../model/card.model';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-city-card',
  template: `
    <app-card
      [list]="cities()"
      [itemTemplate]="itemTemplate"
      (onAddNewItem)="addNewCity()">
      <img ngSrc="assets/img/city.png" width="200" height="200" />
    </app-card>

    <ng-template #itemTemplate let-item>
      <app-list-item
        [name]="item.name"
        [id]="item.id"
        [type]="cardType"
        (onDeleteItem)="deleteCity($event)"></app-list-item>
    </ng-template>
  `,
  imports: [CardComponent, NgOptimizedImage, ListItemComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CityCardComponent {
  private http = inject(FakeHttpService);
  private store = inject(CityStore);

  cities = this.store.cities;
  cardType = CardType.CITY;

  ngOnInit(): void {
    this.http.fetchCities$.subscribe((c) => this.store.addAll(c));
  }

  addNewCity() {
    this.store.addOne(randomCity());
  }

  deleteCity(id: number) {
    this.store.deleteOne(id);
  }
}
