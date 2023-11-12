import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CardComponent } from '../../ui/card/card.component';
import { AsyncPipe } from '@angular/common';
import { ListItemComponent } from '../../ui/list-item/list-item.component';
import { Observable } from 'rxjs';
import { City } from '../../model/city.model';
import {
  FakeHttpService,
  randomCity,
} from '../../data-access/fake-http.service';
import { CityStore } from '../../data-access/city.store';

@Component({
  selector: 'app-city-card',
  template: `
    <app-card [list]="cities | async" class="bg-light-orange">
      <img src="assets/img/city.png" width="200px" />
      <ng-template #rowRef let-city>
        <app-list-item (delete)="deleteCity(city.id)">
          {{ city.name }}
        </app-list-item>
      </ng-template>
      <button
        class="border border-green-500 bg-green-300 p-2 rounded-sm"
        (click)="addNewItem()">
        Add
      </button>
    </app-card>
  `,
  standalone: true,
  imports: [CardComponent, AsyncPipe, ListItemComponent],
  styles: [
    `
      .bg-light-orange {
        background-color: rgb(255, 230, 204);
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CityCardComponent implements OnInit {
  cities: Observable<City[]> = this.store.cities$;
  constructor(private http: FakeHttpService, private store: CityStore) {
    this.http.fetchCities$.subscribe((cities) => this.store.addAll(cities));
  }

  addNewItem() {
    this.store.addOne(randomCity());
  }

  deleteCity(id: number) {
    this.store.deleteOne(id);
  }

  ngOnInit(): void {}
}
