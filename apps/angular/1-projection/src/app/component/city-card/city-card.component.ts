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
import { SectionCardDirective } from '../../directive/sectionCard.directive';
import { Actions } from '../../model/actions.model';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-city-card',
  template: `
    <app-card
      [list]="cities()"
      customClass="bg-light-blue"
      [itemTemplate]="itemTemplate">
      <img
        sectionCard="header"
        ngSrc="assets/img/city.png"
        width="200"
        height="200" />

      <ng-template #itemTemplate let-city>
        <app-list-item
          [name]="city.name"
          [id]="city.id"
          (deleteEvent)="onDeleteItem($event)"></app-list-item>
      </ng-template>

      <button
        sectionCard="footer"
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
    SectionCardDirective,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CityCardComponent implements OnInit, Actions {
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
