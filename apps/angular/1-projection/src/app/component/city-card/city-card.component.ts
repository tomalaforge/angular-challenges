import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CityStore } from '../../data-access/city.store';
import {
  FakeHttpService,
  randomCity,
} from '../../data-access/fake-http.service';
import { CardComponent, ItemRefDirective } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-city-card',
  template: `
    <app-card (addNewItem)="addCity()" [list]="cities()">
      <img ngSrc="assets/img/city.png" width="200" height="200" />
      <ng-template itemRef let-item>
        <app-list-item (onDelete)="deleteCity(item.id)">
          {{ item.name }}
        </app-list-item>
      </ng-template>
    </app-card>
  `,
  styles: [
    `
      app-card {
        background-color: rgba(0, 0, 250, 0.1);
      }
    `,
  ],
  host: {
    class: 'flex justify-center p-4',
  },
  imports: [
    CardComponent,
    ListItemComponent,
    ItemRefDirective,
    NgOptimizedImage,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CityCardComponent {
  private http = inject(FakeHttpService);
  private store = inject(CityStore);
  cities = this.store.cities;

  ngOnInit(): void {
    this.http.fetchCities$.subscribe((c) => this.store.addAll(c));
  }

  deleteCity(id: number) {
    this.store.deleteOne(id);
  }

  addCity() {
    this.store.addOne(randomCity());
  }
}
