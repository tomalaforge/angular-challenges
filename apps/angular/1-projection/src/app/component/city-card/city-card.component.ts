import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CityStore } from '../../data-access/city.store';
import {
  FakeHttpService,
  randomCity,
} from '../../data-access/fake-http.service';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-city-card',
  template: `
    <app-card [list]="cities()" class="bg-light-yellow">
      <img ngSrc="assets/img/city.png" width="200" height="200" />
      <ng-template #rowRef let-city>
        <app-list-item>
          {{ city.name }}
          <button (click)="deleteCity(city.id)">
            <img class="h-5" src="assets/svg/trash.svg" />
          </button>
        </app-list-item>
      </ng-template>
      <button
        class="rounded-sm border border-blue-500 bg-blue-300 p-2"
        (click)="addCity()">
        Add
      </button>
    </app-card>
  `,
  styles: [
    `
      .bg-light-yellow {
        background-color: rgba(250, 250, 0, 0.1);
      }
    `,
  ],
  imports: [CardComponent, NgOptimizedImage, ListItemComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CityCardComponent {
  private http = inject(FakeHttpService);
  private store = inject(CityStore);

  cities = this.store.cities;

  ngOnInit(): void {
    this.http.fetchCities$.subscribe((s) => this.store.addAll(s));
  }

  addCity() {
    this.store.addOne(randomCity());
  }
  deleteCity(id: number) {
    this.store.deleteOne(id);
  }
}
