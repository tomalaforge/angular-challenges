import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { CityStore } from '../../data-access/city.store';
import {
  FakeHttpService,
  randomCity,
} from '../../data-access/fake-http.service';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemDirective } from '../../ui/list-item/list-item-directive';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-city-card',
  standalone: true,
  imports: [CardComponent, ListItemComponent, ListItemDirective],
  template: `
    <app-card [list]="cities()" (add)="addCity()" class="bg-light-purple">
      <img src="assets/img/city.png" width="200px" alt="city" />
      <ng-template listItemRef let-city>
        <app-list-item (delete)="deleteCity(city.id)">
          {{ city.name }}
        </app-list-item>
      </ng-template>
    </app-card>
  `,
  styles: [
    `
      .bg-light-purple {
        background-color: lightcyan;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CityCardComponent implements OnInit {
  private _http = inject(FakeHttpService);
  private _store = inject(CityStore);
  cities = this._store.cities;

  ngOnInit(): void {
    this._http.fetchCities$.subscribe((value) => this._store.addAll(value));
  }

  addCity(): void {
    this._store.addOne(randomCity());
  }

  deleteCity(id: number): void {
    this._store.deleteOne(id);
  }
}
