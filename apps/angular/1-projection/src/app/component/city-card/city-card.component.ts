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

@Component({
  selector: 'app-city-card',
  template: `
    <app-card
      customClass="bg-color"
      [imgTitle]="cardImg"
      [list]="cities()"
      (addNew)="addNewItem()"
      (itemId)="deleteItem($event)" />
  `,
  styles: [
    `
      :host {
        --card-background: rgba(79, 64, 242, 0.1);
      }
    `,
  ],
  imports: [CardComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CityCardComponent implements OnInit {
  private readonly http = inject(FakeHttpService);
  private readonly store = inject(CityStore);

  cities = this.store.cities;
  cardImg = 'assets/img/city.png';

  ngOnInit(): void {
    this.http.fetchCities$.subscribe((t) => this.store.addAll(t));
  }

  addNewItem() {
    this.store.addOne(randomCity());
  }

  deleteItem(id: number) {
    this.store.deleteOne(id);
  }
}
