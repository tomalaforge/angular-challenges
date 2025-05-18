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
import { CardComponent, CardListDirective } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-city-card',
  template: `
    <app-card
      (addNewItem)="addNewItem()"
      [list]="cities()"
      class="bg-light-blue">
      <img card-header ngSrc="assets/img/city.png" width="200" height="200" />
      <ng-template card-list-item let-city>
        <app-list-item (deleteItem)="deleteItem(city.id)">
          {{ city.country }}
        </app-list-item>
      </ng-template>
    </app-card>
  `,
  imports: [
    NgOptimizedImage,
    CardComponent,
    ListItemComponent,
    CardListDirective,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CityCardComponent implements OnInit {
  private readonly http = inject(FakeHttpService);
  private readonly store = inject(CityStore);

  cities = this.store.cities;

  ngOnInit(): void {
    this.http.fetchCities$.subscribe((t) => this.store.addAll(t));
  }

  addNewItem() {
    this.store.addOne(randomCity());
  }

  deleteItem(id: number) {
    this.store.deleteOne(id);
  }
}
