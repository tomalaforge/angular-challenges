import { NgTemplateOutlet } from '@angular/common';
import { Component, Signal } from '@angular/core';
import { CityStore } from '../../data-access/city.store';
import { randomCity } from '../../data-access/fake-http.service';
import { City } from '../../model/city.model';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-city-card',
  template: `
    <app-card [list]="cities()" backgroundColor="rgba(0, 0, 250, 0.1)">
      <img src="assets/img/city.png" width="200px" />
      <ng-template deleteButton let-item>
        <app-list-item [id]="item.id" (listItemDelete)="deleteCity($event)">
          {{ item.name }}
        </app-list-item>
      </ng-template>
      <button
        class="rounded-sm border border-blue-500 bg-blue-300 p-2"
        (click)="addCity()">
        Add
      </button>
    </app-card>
  `,
  standalone: true,
  imports: [CardComponent, NgTemplateOutlet, ListItemComponent],
})
export class CityCardComponent {
  cities: Signal<City[]> = this.store.cities$;

  constructor(private store: CityStore) {}

  addCity() {
    this.store.addOne(randomCity());
  }

  deleteCity(id: number) {
    this.store.deleteOne(id);
  }
}
