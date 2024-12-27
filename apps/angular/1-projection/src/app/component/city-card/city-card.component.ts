import { Component, inject, OnInit, Signal } from '@angular/core';
import { CityStore } from '../../data-access/city.store';
import {
  FakeHttpService,
  randomCity,
} from '../../data-access/fake-http.service';
import { City } from '../../model/city.model';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-city-card',
  template: `
    <app-card
      [list]="cities()"
      [customClass]="'rgba(0, 0, 250, 0.1)'"
      [templateRef]="city"
      (add)="addCity()">
      <img src="assets/img/city.png" width="200px" />
    </app-card>

    <ng-template #city let-city>
      <app-list-item
        [name]="city.name"
        [id]="city.id"
        (delete)="deleteCity(city.id)" />
    </ng-template>
  `,
  imports: [CardComponent, ListItemComponent],
})
export class CityCardComponent implements OnInit {
  private http: FakeHttpService = inject(FakeHttpService);
  private store: CityStore = inject(CityStore);

  cities: Signal<City[]> = this.store.elements$;

  ngOnInit(): void {
    this.http.fetchCities$.subscribe((c) => this.store.addAll(c));
  }

  addCity() {
    this.store.addOne(randomCity());
  }

  deleteCity(cityId: number) {
    this.store.deleteOne(cityId);
  }
}
