import { Component, OnInit, signal, WritableSignal } from '@angular/core';
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
      customClass="bg-light-blue"
      (AddNewRecordEmitter)="handleAddNewCity()"
      [ListItemTemplate]="itemTemplate">
      <img src="assets/img/city.png" width="200px" image />
      <ng-template #itemTemplate let-item>
        <app-list-item
          [item]="item"
          (DeleteNewRecordEmitter)="handleDeleteCity($event)">
          <p>{{ item.name }}</p>
        </app-list-item>
      </ng-template>
    </app-card>
  `,
  standalone: true,
  imports: [CardComponent, ListItemComponent],
})
export class CityCardComponent implements OnInit {
  cities: WritableSignal<City[]> = signal([]);
  constructor(
    private http: FakeHttpService,
    private store: CityStore,
  ) {}

  ngOnInit(): void {
    this.http.fetchCities$.subscribe((s) => this.store.addAll(s));

    this.store.cities$.subscribe((s) => this.cities.set(s));
  }

  handleDeleteCity(id: number) {
    this.store.deleteOne(id);
  }

  handleAddNewCity() {
    this.store.addOne(randomCity());
  }
}
