import { NgIf } from '@angular/common';
import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { CityStore } from '../../data-access/city.store';
import {
  FakeHttpService,
  randomCity,
} from '../../data-access/fake-http.service';
import { City } from '../../model/city.model';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';
import { isCityEntity } from '../../utils';

@Component({
  selector: 'app-city-card',
  template: `
    <app-card
      [list]="cities"
      [listItemTemplate]="listItem"
      (onAddNewItem)="addNewItem()">
      <img avatar src="assets/img/city.png" width="200px" />
    </app-card>

    <ng-template #listItem let-city>
      <app-list-item
        *ngIf="isCityEntity(city)"
        [name]="city.name"
        [id]="city.id"
        (onDeleteItem)="deleteItem($event)"></app-list-item>
    </ng-template>
  `,
  standalone: true,
  imports: [ListItemComponent, CardComponent, NgIf],
  styles: [
    `
      :host {
        --app-card-background: rgba(0, 0, 250, 0.1);
      }
    `,
  ],
})
export class CityCardComponent implements OnInit {
  cities: City[] = [];

  private readonly destroyRef = inject(DestroyRef);

  private readonly http: FakeHttpService = inject(FakeHttpService);

  private readonly store: CityStore = inject(CityStore);

  ngOnInit(): void {
    this.http.fetchCities$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((cities: City[]) => this.store.addAll(cities));

    this.store.cities$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((cities: City[]) => (this.cities = cities));
  }

  addNewItem(): void {
    this.store.addOne(randomCity());
  }

  deleteItem(id: number): void {
    this.store.deleteOne(id);
  }

  protected readonly isCityEntity = isCityEntity;
}
