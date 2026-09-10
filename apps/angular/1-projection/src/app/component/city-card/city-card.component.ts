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
import { CardType } from '../../model/card.model';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-city-card',
  template: `
    <app-card [list]="cities()" (addEvent)="addNewCity()">
      <img
        head-img
        src="assets/img/city.png"
        width="200"
        height="200"
        alt=""
        class="img" />

      <ng-template #itemContent let-item let-type="type">
        <app-list-item
          [name]="item.name"
          [id]="item.id"
          (deleted)="deleteCity($event)" />
      </ng-template>
    </app-card>
  `,
  imports: [CardComponent, ListItemComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CityCardComponent implements OnInit {
  private http = inject(FakeHttpService);
  private store = inject(CityStore);

  cities = this.store.cities;
  cardType = CardType.CITY;

  ngOnInit(): void {
    this.http.fetchCities$.subscribe((c) => this.store.addAll(c));
  }

  addNewCity = () => {
    this.store.addOne(randomCity());
  };

  deleteCity = (id: number) => {
    this.store.deleteOne(id);
  };
}
