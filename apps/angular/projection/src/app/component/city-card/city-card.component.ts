import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CityStore } from '../../data-access/cities.store';
import {
  FakeHttpService,
  randomCity,
} from '../../data-access/fake-http.service';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';
import { CardViewModel } from '../../model/card.model';
import { City } from '../../model/city.model';

@Component({
  standalone: true,
  selector: 'app-city-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CardComponent, AsyncPipe, ListItemComponent],
  template: `
    <app-card class="bg-light-blue" [list]="datasource$ | async" (add)="add()">
      <img src="assets/img/city.png" width="200px" />
      <ng-template #rowRef let-city>
        <app-list-item (delete)="delete(city.id)">
          {{ city.name }}
        </app-list-item>
      </ng-template>
    </app-card>
  `,
  styles: [
    `
      .bg-light-blue {
        background-color: rgba(0, 0, 250, 0.1);
      }
    `,
  ],
})
export class CityCardComponent implements OnInit, CardViewModel<City> {
  datasource$ = this.store.cities$;

  constructor(private http: FakeHttpService, private store: CityStore) {}

  ngOnInit(): void {
    this.http.fetchCities$.subscribe((s) => this.store.addAll(s));
  }

  add(): void {
    this.store.addOne(randomCity());
  }
  delete(id: number): void {
    this.store.deleteOne(id);
  }
}
