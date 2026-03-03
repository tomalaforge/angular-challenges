import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CityStore } from '../../data-access/city.store';
import {
  FakeHttpService,
  randomCity,
} from '../../data-access/fake-http.service';
import { CardListItemTemplateDirective } from '../../ui/card/card-list-item-template.directive';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-city-card',
  template: `
    <app-card
      [list]="cities()"
      customClass="bg-light-blue"
      (onAddNewItem)="addNewCity()">
      <img ngSrc="assets/img/city.png" width="200" height="200" />

      <ng-template appCardListItem let-item="item">
        <app-list-item
          [name]="item.name"
          [id]="item.id"
          (onDelete)="deleteCity(item.id)"></app-list-item>
      </ng-template>
    </app-card>
  `,
  imports: [
    CardComponent,
    CardListItemTemplateDirective,
    ListItemComponent,
    NgOptimizedImage,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CityCardComponent {
  private http = inject(FakeHttpService);
  store = inject(CityStore);
  cities = this.store.cities;

  ngOnInit(): void {
    this.http.fetchCities$.subscribe((s) => this.store.addAll(s));
  }

  addNewCity() {
    this.store.addOne(randomCity());
  }

  deleteCity(id: number) {
    this.store.deleteOne(id);
  }
}
