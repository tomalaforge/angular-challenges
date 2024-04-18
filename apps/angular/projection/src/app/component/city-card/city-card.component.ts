import { AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { CityStore } from '../../data-access/city.store';
import { randomCity } from '../../data-access/fake-http.service';
import { CardItem } from '../../model/card.model';
import { City } from '../../model/city.model';
import { DataCardComponentBase, DataStoreBase } from '../../shared';
import { CardComponent } from '../../ui/card/card.component';

@Component({
  selector: 'app-city-card',
  template: `
    <app-card
      [list]="data$ | async"
      (addNewItem)="onAddNewItem()"
      (deleteItem)="onDeleteItem($event)"
      [backgroundColor]="'rgba(250, 10, 250, 0.1)'">
      <img src="assets/img/city.png" style="width: 200px;" image />
    </app-card>
  `,
  standalone: true,
  providers: [
    {
      provide: DataStoreBase,
      useClass: CityStore,
    },
  ],
  imports: [CardComponent, AsyncPipe],
})
export class CityCardComponent
  extends DataCardComponentBase<City>
  implements OnInit
{
  override data$ = this.source$.pipe(
    map((response) => response.map(({ id, name }) => new CardItem(id, name))),
  );

  ngOnInit(): void {
    this.http.fetchCities$.subscribe((t) => this.store.addAll(t));
  }

  override onAddNewItem(): void {
    this.store.addOne(randomCity());
  }
}
