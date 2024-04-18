import { AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CityStore } from '../../data-access/city.store';
import { randomCity } from '../../data-access/fake-http.service';
import { City } from '../../model/city.model';
import { DataCardComponentBase, DataStoreBase } from '../../shared';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-city-card',
  template: `
    <app-card
      [list]="$data()"
      (addNewItem)="onAddNewItem()"
      style="background-color: rgba(250, 10, 250, 0.1);">
      <img src="assets/img/city.png" style="width: 200px;" cover />

      <ng-template #cardRow let-item>
        <app-list-item [name]="item.name">
          <button (click)="onDeleteItem(item.id)" delete>
            <img class="h-5" src="assets/svg/trash.svg" />
          </button>
        </app-list-item>
      </ng-template>
    </app-card>
  `,
  standalone: true,
  providers: [
    {
      provide: DataStoreBase,
      useClass: CityStore,
    },
  ],
  imports: [CardComponent, AsyncPipe, ListItemComponent],
})
export class CityCardComponent
  extends DataCardComponentBase<City>
  implements OnInit
{
  ngOnInit(): void {
    this.http.fetchCities$.subscribe((t) => this.store.addAll(t));
  }

  override onAddNewItem(): void {
    this.store.addOne(randomCity());
  }
}
