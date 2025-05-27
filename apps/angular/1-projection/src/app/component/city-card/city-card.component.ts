import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CityStore } from '../../data-access/city.store';
import { randomCity } from '../../data-access/fake-http.service';
import { CardType } from '../../model/card.model';
import { CardComponent } from '../../ui/card/card.component';

@Component({
  selector: 'app-city-card',
  template: `
    <app-card
      [list]="cities()"
      [type]="cardType"
      (addNewItem)="addCity()"
      (delete)="deleteCity($event)"
      class="bg-light-blue">
      <img
        ngSrc="assets/img/city.png"
        width="200"
        height="200"
        priority
        ngProjectAs="card-img" />
    </app-card>
  `,
  styles: [
    `
      .bg-light-blue {
        background-color: rgba(0, 171, 250, 0.1);
      }
    `,
  ],
  imports: [CardComponent, NgOptimizedImage],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CityCardComponent {
  private store = inject(CityStore);

  readonly cities = this.store.cities;
  readonly cardType = CardType.CITY;

  addCity() {
    this.store.addOne(randomCity());
  }

  deleteCity(id: number) {
    this.store.deleteOne(id);
  }
}
