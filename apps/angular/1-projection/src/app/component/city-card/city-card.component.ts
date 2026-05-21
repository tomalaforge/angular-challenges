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
    <app-card [list]="cities()">
      <div card-header class="flex flex-col items-center">
        <img
          ngSrc="assets/img/city.png"
          width="200"
          height="200"
          alt="Cities list view banner"
          priority />
      </div>

      <ng-template #itemTemplate let-item>
        <app-list-item
          [name]="item.name"
          [id]="item.id"
          [type]="cardType"
          (emitDelete)="deleteSingle($event)" />
      </ng-template>

      <div card-action>
        <button
          class="rounded-sm border border-blue-500 bg-blue-300 p-2"
          (click)="addNew()">
          Add
        </button>
      </div>
    </app-card>
  `,
  imports: [CardComponent, NgOptimizedImage, ListItemComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CityCardComponent {
  readonly cityStore = inject(CityStore);
  readonly http = inject(FakeHttpService);

  cardType = CardType.CITY;
  readonly cities = this.cityStore.cities;

  ngOnInit(): void {
    this.http.fetchCities$.subscribe((c) => this.cityStore.addAll(c));
  }

  addNew(): void {
    this.cityStore.addOne(randomCity());
  }

  deleteSingle(id: number) {
    this.cityStore.deleteOne(id);
  }
}
