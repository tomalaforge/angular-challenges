import { Component, OnInit } from '@angular/core';
import { CityStore } from '../../data-access/city.store';
import { FakeHttpService } from '../../data-access/fake-http.service';
import { City } from '../../model/city.model';
import { CardComponent } from '../../ui/card/card.component';
@Component({
  selector: 'app-city-card',
  template: `<app-card [store]="store" [getName]="getCityName" [list]="cities">
    <img width="200px" src="/assets/img/city.avif" />
  </app-card>`,
  standalone: true,
  imports: [CardComponent],
})
export class CityCardComponent implements OnInit {
  cities: City[] = [];

  constructor(private http: FakeHttpService, public store: CityStore) {}

  ngOnInit(): void {
    this.http.fetchCities$.subscribe((cities) => this.store.addAll(cities));
    this.store.cities$.subscribe((cities) => (this.cities = cities));
  }

  getCityName(city: City) {
    return city.name;
  }
}
