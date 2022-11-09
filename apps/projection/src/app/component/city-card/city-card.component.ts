import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { CityStore } from '../../data-access/city.store';
import {
  FakeHttpService,
  randomCity,
} from '../../data-access/fake-http.service';
import { Item } from '../../model/item.model';
import { CardComponent } from '../../ui/card/card.component';

@Component({
  selector: 'app-city-card',
  template: `<app-card
    [items]="cityItems$ | async"
    customClass="bg-light-blue"
    [listItemTemplate]="listItemTemplate"
    (addNewItem)="addNewCity()"
    (deleteItem)="deleteCity($event)">
    <ng-container image>
      <img src="assets/img/city.png" width="200px" />
    </ng-container>
    <ng-template #listItemTemplate let-item>{{ item?.name }} (C)</ng-template>
  </app-card>`,
  standalone: true,
  imports: [CardComponent, AsyncPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CityCardComponent implements OnInit {
  cityItems$!: Observable<Item[]>;
  constructor(private http: FakeHttpService, private store: CityStore) {}

  ngOnInit(): void {
    this.http.fetchCities$.subscribe((c) => this.store.addAll(c));

    this.cityItems$ = this.store.cities$.pipe(
      map((cities) =>
        cities.map(
          (c) => ({ name: `${c.name}, ${c.country}`, id: c.id } as Item)
        )
      )
    );
  }

  addNewCity(): void {
    this.store.addOne(randomCity());
  }

  deleteCity(id: number): void {
    this.store.deleteOne(id);
  }
}
