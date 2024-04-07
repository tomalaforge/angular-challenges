import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CityStore } from '../../data-access/city.store';
import { FakeHttpService } from '../../data-access/fake-http.service';
import { CardType } from '../../model/card.model';
import { City } from '../../model/city.model';
import { CardComponent } from '../../ui/card/card.component';

@Component({
  selector: 'app-city-card',
  template: `
    <app-card
      [list]="cities"
      [type]="cardType"
      [imageSrc]="'assets/img/city.png'"
      customClass="bg-light-blue"></app-card>
  `,
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  styles: [
    `
      .bg-light-blue {
        background-color: rgba(147, 197, 253, 0.1);
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
    this.http.fetchCities$.subscribe((cities) => this.store.addAll(cities));

    this.store.cities$.subscribe((cities) => (this.cities = cities));
  }
}
