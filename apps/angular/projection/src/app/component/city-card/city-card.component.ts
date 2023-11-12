import { Component, OnInit } from '@angular/core';
import { CardType } from '../../model/card.model';
import { City } from '../../model/city.model';
import { FakeHttpService } from '../../data-access/fake-http.service';
import { CityStore } from '../../data-access/city-store';
import { CardComponent } from '../../ui/card/card.component';

@Component({
  selector: 'app-city-card',
  standalone: true,
  template: `<app-card
    [list]="cities"
    [type]="cardType"
    customClass="bg-light-blue">
    <img src="assets/img/city.png" alt="City" width="200px" />
  </app-card>`,
  styles: [
    `
      ::ng-deep .bg-light-blue {
        background-color: rgba(0, 0, 240, 0.1);
      }
    `,
  ],
  imports: [CardComponent],
})
export class CityCardComponent implements OnInit {
  cities: City[] = [];
  cardType = CardType.CITY;

  constructor(private http: FakeHttpService, private store: CityStore) {}

  ngOnInit(): void {
    this.http.fetchCities$.subscribe((s) => this.store.addAll(s));

    this.store.cities$.subscribe((s) => (this.cities = s));
  }
}
