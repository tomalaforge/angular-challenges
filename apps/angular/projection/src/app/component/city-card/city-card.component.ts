import { Component, OnInit, WritableSignal, signal } from '@angular/core';
import { CardComponent } from '../../ui/card/card.component';
import {
  FakeHttpService,
  randomCity,
} from '../../data-access/fake-http.service';
import { City } from '../../model/city.model';
import { CityStore } from '../../data-access/city.store';

@Component({
  selector: 'app-city-card',
  template: `
    <app-card [list]="cities()" customClass="bg-light-green">
      <ng-template let-item="item" #nameTemplate>
        {{ item.name }}
        <ng-container ngProjectAs="delete-button">
          <button (click)="delete(item.id)">
            <img class="h-5" src="assets/svg/trash.svg" />
          </button>
        </ng-container>
      </ng-template>

      <ng-container ngProjectAs="add-button">
        <button
          class="border border-blue-500 bg-blue-300 p-2 rounded-sm"
          (click)="add()">
          Add
        </button>
      </ng-container>
    </app-card>
  `,
  standalone: true,
  imports: [CardComponent],
})
export class CityCardComponent implements OnInit {
  cities: WritableSignal<City[]> = signal([]);

  constructor(private http: FakeHttpService, private store: CityStore) {}

  ngOnInit(): void {
    this.http.fetchCities$.subscribe((t) => this.store.addAll(t));

    this.store.cities$.subscribe((t) => this.cities.set(t));
  }

  delete(id: number) {
    this.store.deleteOne(id);
  }

  add() {
    this.store.addOne(randomCity());
  }
}
