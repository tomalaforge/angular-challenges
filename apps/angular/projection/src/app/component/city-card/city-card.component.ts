import { Component, OnInit } from '@angular/core';
import {
  FakeHttpService,
  randomCity,
} from '../../data-access/fake-http.service';
import { CityStore } from '../../data-access/city.store';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';
import { CardItemContentDirective } from '../../ui/card/card-item-content.directive';
import {toSignal} from "@angular/core/rxjs-interop";

@Component({
  selector: 'app-city-card',
  template: ` <app-card
    [list]="cities()"
    class="bg-light-blue"
    (addItem)="addNewCity()">
    <ng-template let-city appCardItemContent>
      <app-list-item (deleteItem)="deleteCity(city.id)">
        {{ city.name }}
      </app-list-item>
    </ng-template>
  </app-card>`,
  styles: [
    `
      .bg-light-blue {
        background-color: rgba(0, 0, 250, 0.1);
      }
    `,
  ],
  standalone: true,
  imports: [CardComponent, ListItemComponent, CardItemContentDirective],
})
export class CityCardComponent implements OnInit {
  cities = toSignal(this.store.cities$);

  constructor(
    private http: FakeHttpService,
    private store: CityStore,
  ) {}

  ngOnInit(): void {
    this.http.fetchCities$.subscribe((s) => this.store.addAll(s));
  }

  addNewCity() {
    this.store.addOne(randomCity());
  }

  deleteCity(id: number) {
    this.store.deleteOne(id);
  }
}
