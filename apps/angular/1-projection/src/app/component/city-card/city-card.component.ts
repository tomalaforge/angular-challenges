import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CityStore } from '../../data-access/city.store';
import {
  FakeHttpService,
  randomCity,
} from '../../data-access/fake-http.service';
import { CardType } from '../../model/card.model';
import { City } from '../../model/city.model';
import { CardComponent } from '../../ui/card/card.component';

@Component({
  selector: 'app-city-card',
  template: `
    <app-card
      [list]="cities"
      [type]="cardType"
      [image]="'assets/img/city.png'"
      [customClass]="
        'flex w-fit flex-col gap-3 rounded-md border-2 border-black p-4 bg-light-yellow'
      ">
      <button
        class="rounded-sm border border-blue-500 bg-blue-300 p-2"
        (click)="add()">
        Add
      </button>
    </app-card>
  `,
  styles: [
    `
      .bg-light-yellow {
        background-color: rgba(250, 250, 0, 0.5);
      }
    `,
  ],
  standalone: true,
  imports: [CardComponent],
  encapsulation: ViewEncapsulation.None,
})
export class CityCardComponent implements OnInit {
  cities: City[] = [];
  cardType = CardType.CITY;

  constructor(
    private http: FakeHttpService,
    private store: CityStore,
  ) {}

  ngOnInit(): void {
    this.http.fetchCities$.subscribe((s) => this.store.addAll(s));
    this.store.cities$.subscribe((s) => (this.cities = s));
  }

  public add() {
    this.store.addOne(randomCity());
  }
}
