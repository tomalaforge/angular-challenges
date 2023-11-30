import { Component, OnInit } from '@angular/core';
import { City } from '../../model/city.model';
import { CardComponent } from '../../ui/card/card.component';
import { CardType } from '../../model/card.model';
import { FakeHttpService } from '../../data-access/fake-http.service';
import { CityStore } from '../../data-access/city.store';

@Component({
  selector: 'app-city-card',
  template: ` <app-card
    [list]="cities"
    [type]="cardType"
    customClass="bg-light-red"></app-card>`,
  standalone: true,
  styles: [
    `
      .bg-light-red {
        background-color: rgba(0, 250, 0, 0.1);
      }
    `,
  ],
  imports: [CardComponent],
})
export class CityCardComponent implements OnInit {
  cities: City[] = [];
  cardType = CardType.CITY;

  constructor(
    private http: FakeHttpService,
    private store: CityStore,
  ) {}

  ngOnInit(): void {
    this.http.fetchCities$.subscribe((t) => this.store.addAll(t));

    this.store.cities$.subscribe((t) => (this.cities = t));
  }
}
