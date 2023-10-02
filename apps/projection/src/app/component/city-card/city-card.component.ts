import { Component, OnInit } from '@angular/core';
import { CardComponent } from '../../ui/card/card.component';
import { City } from '../../model/city.model';
import { CityStore } from '../../data-access/city.store';
import { CardType } from '../../model/card.model';
import { FakeHttpService } from '../../data-access/fake-http.service';

@Component({
  selector: 'app-city-card',
  template: `<app-card
    [list]="cities"
    [type]="cardType"
    customClass="bg-light-green"></app-card>`,
  standalone: true,
  imports: [CardComponent],
})
export class CityCardComponent implements OnInit {
  cities: City[] = [];
  cardType = CardType.CITY;
  constructor(private http: FakeHttpService, private store: CityStore) {}

  ngOnInit(): void {
    this.http.fetchCities$.subscribe((c) => {
      console.log(c);
      this.store.addAll(c);
    });
    this.store.cities$.subscribe((c) => {
      console.log(c);
      this.cities = c;
    });
  }
}
