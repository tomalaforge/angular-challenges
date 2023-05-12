import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CardComponent } from '../../ui/card/card.component';
import { City } from '../../model/city.model';
import { CardType } from '../../model/card.model';
import { FakeHttpService } from '../../data-access/fake-http.service';
import { CityStore } from '../../data-access/city.store';

@Component({
  selector: 'app-city-card',
  template: ` <app-card [list]="cities" [type]="cardType"> </app-card>`,
  standalone: true,
  imports: [CardComponent],
  styles: [
    `
      app-city-card div {
        background-color: orange;
      }
    `,
  ],
  encapsulation: ViewEncapsulation.None,
})
export class CityCardComponent implements OnInit {
  cities: City[] = [];
  cardType = CardType.CITY;

  constructor(private http: FakeHttpService, private store: CityStore) {}

  ngOnInit(): void {
    this.fetchCities();
  }

  fetchCities(): void {
    this.http.fetchCities$.subscribe((cities: City[]) =>
      this.store.addAll(cities)
    );
    this.store.cities$.subscribe((cities: City[]) => (this.cities = cities));
  }
}
