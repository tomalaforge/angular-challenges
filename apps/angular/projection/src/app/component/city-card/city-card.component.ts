import { Component, inject } from '@angular/core';
import { randomCity } from '../../data-access/fake-http.service';
import { CityStore } from '../../data-access/city.store';
import { AsyncPipe, NgIf } from '@angular/common';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-city-card',
  template: `
    @if (cities$ | async; as cities) {
      <app-card [list]="cities" customClass="bg-light-blue">
        <img src="assets/img/city.webp" width="200px" alt="" />

        <ng-template let-city #cardContent>
          <app-list-item
            [name]="city.name"
            (deleteEmitter)="deleteCity(city.id)">
          </app-list-item>
        </ng-template>

        <ng-template #cardButtons>
          <button
            class="border border-blue-500 bg-blue-300 p-2 rounded-sm"
            (click)="addNewCity()">
            Add
          </button>
        </ng-template>
      </app-card>
    }
  `,
  styles: [
    `
      :host::ng-deep.bg-light-blue {
        background-color: rgba(28, 139, 158, 0.1);
      }
    `,
  ],
  standalone: true,
  imports: [CardComponent, NgIf, AsyncPipe, ListItemComponent],
})
export class CityCardComponent {
  private readonly _store = inject(CityStore);
  protected readonly cities$ = this._store.cities$;

  addNewCity(): void {
    this._store.addOne(randomCity());
  }

  deleteCity(id: number): void {
    this._store.deleteOne(id);
  }
}
