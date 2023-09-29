import { Component, inject } from '@angular/core';
import { CardComponent } from "../../ui/card/card.component";
import { ListItemComponent } from "../../ui/list-item/list-item.component";
import { FakeHttpService, randomCity } from "../../data-access/fake-http.service";
import { toSignal } from "@angular/core/rxjs-interop";
import { switchMap, tap } from "rxjs";
import { CityStore } from "../../data-access/city.store";

@Component({
  selector: 'app-city-card',
  template: `
      <app-card
          [list]="cities() ?? []"
          label="firstname"
          (added)="addCity()">
          <img card-header src="assets/img/city.png" width="200px"/>

          <ng-template #row let-city>
              <app-list-item (deleted)="deleteCity(city.id)">{{city.name}} - {{city.country}}</app-list-item>
          </ng-template>
      </app-card>`,
  standalone: true,
  styles: [
    `app-card {
        background-color: rgba(0, 71, 250, 0.1);
    }`
  ],
  imports: [
    CardComponent,
    ListItemComponent
  ],
})
export class CityCardComponent {
  readonly #http = inject(FakeHttpService);
  readonly #store = inject(CityStore);

  cities = toSignal(
    this.#http.fetchCities$.pipe(
      tap((cities) => this.#store.addAll(cities)),
      switchMap(() => this.#store.cities$)
    )
  );

  addCity() {
    this.#store.addOne(randomCity());
  }

  deleteCity(id: number) {
    this.#store.deleteOne(id);
  }
}
