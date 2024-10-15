import { Component, inject, OnInit } from '@angular/core';
import { CityStore } from '../../data-access/city.store';
import {
  FakeHttpService,
  randomCity,
} from '../../data-access/fake-http.service';
import { City } from '../../model/city.model';
import { CardModule } from '../../ui/card/card.module';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-city-card',
  template: `
    <app-card [list]="cities">
      <img src="assets/img/city.png" width="200" />
      <ng-template [cardItem]="cities" let-item>
        <app-list-item [id]="item.id" [name]="item.name" />
      </ng-template>
    </app-card>
  `,
  standalone: true,
  imports: [CardModule, ListItemComponent],
})
export class CityCardComponent implements OnInit {
  private _http = inject(FakeHttpService);
  private _store = inject(CityStore);

  cities: City[] = [];

  ngOnInit(): void {
    this._http.fetchCities$.subscribe((s) => this._store.addAll(s));

    this._store.cities$.subscribe((s) => (this.cities = s));
  }

  addItem(): void {
    this._store.addOne(randomCity());
  }

  deleteItem(index: number): void {
    this._store.deleteOne(index);
  }
}
