import { NgOptimizedImage } from '@angular/common';
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
import { CardActions } from '../../model';
import {
  CardComponent,
  CardSectionDirective,
  ListItemComponent,
} from '../../ui';

@Component({
  selector: 'app-city-card',
  template: `
    <app-card
      [list]="cities()"
      customClass="bg-light-blue"
      [cardItemTemplate]="cardItemTemplate">
      <img
        cardSection="header"
        ngSrc="assets/img/city.png"
        width="200"
        height="200" />

      <ng-template #cardItemTemplate let-city>
        <app-list-item
          [name]="city.name"
          [id]="city.id"
          (deleteEvent)="onDeleteItem($event)"></app-list-item>
      </ng-template>

      <button
        cardSection="footer"
        class="rounded-sm border border-blue-500 bg-blue-300 p-2"
        (click)="onAddNewItem()">
        Add
      </button>
    </app-card>
  `,
  imports: [
    CardComponent,
    NgOptimizedImage,
    ListItemComponent,
    CardSectionDirective,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CityCardComponent implements OnInit, CardActions {
  private readonly http = inject(FakeHttpService);
  private readonly store = inject(CityStore);

  cities = this.store.cities;

  ngOnInit(): void {
    this.http.fetchCities$.subscribe((cities) => this.store.addAll(cities));
  }

  onAddNewItem() {
    this.store.addOne(randomCity());
  }

  onDeleteItem(id: number) {
    this.store.deleteOne(id);
  }
}
