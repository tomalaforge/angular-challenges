import { Component, OnInit } from '@angular/core';
import { FakeHttpService } from '../../data-access/fake-http.service';
import { City } from '../../model/city.model';
import { CardType } from '../../model/card.model';
import { CityStore } from '../../data-access/city.store.';
import { CardComponent } from '../../ui/card/card.component';

@Component({
  selector: 'app-city-card',
  template: ` <app-card
    [list]="cities"
    [type]="cardType"
    customClass="bg-light-green">
    <img class="header-image" src="assets/img/city.avif" width="200px" />
  </app-card>`,
  standalone: true,
  imports: [CardComponent],
})
export class CityCardComponent implements OnInit {
  constructor(private http: FakeHttpService, private store: CityStore) {}

  cities: City[] = [];
  cardType = CardType.CITY;
  ngOnInit(): void {
    this.http.fetchCities$.subscribe((cities) => this.store.addAll(cities));
    this.store.cities$.subscribe((cities) => (this.cities = cities));
  }
}
