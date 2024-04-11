import { Component, OnInit } from '@angular/core';
import { CityStore } from '../../data-access/city.store';
import { FakeHttpService } from '../../data-access/fake-http.service';
import { CardType } from '../../model/card.model';
import { City } from '../../model/city.model';
import { CardComponent } from '../../ui/card/card.component';

@Component({
  selector: 'app-city-card',
  template: `
    <app-card [list]="cities" [type]="cardType" customClass="bg-light-green">
      <img style="width:200px;" showImg src="../../assets/img/city.png" />
    </app-card>
  `,
  standalone: true,
  imports: [CardComponent],
})
export class CityCardComponent implements OnInit {
  constructor(
    private http: FakeHttpService,
    private cityStore: CityStore,
  ) {}

  cities: City[] = [];
  cardType = CardType.CITY;

  ngOnInit(): void {
    this.http.fetchCities$.subscribe((s) => this.cityStore.addAll(s));

    this.cityStore.cities$.subscribe((s) => (this.cities = s));
  }
}
