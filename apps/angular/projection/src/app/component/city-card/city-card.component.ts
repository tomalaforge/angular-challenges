import { Component, OnInit } from '@angular/core';
import {
  FakeHttpService,
  randomCity,
} from '../../data-access/fake-http.service';
import { CityStore } from '../../data-access/city.store';
import { City } from '../../model/city.model';
import { CardType } from '../../model/card.model';
import { CardComponent } from '../../ui/card/card.component';

@Component({
  selector: 'app-city-card',
  template: `<app-card
    [list]="cities"
    [nameAttr]="'name'"
    (add)="addNewCity()"
    (delete)="deleteCity($event)"
    customClass="bg-light-blue">
    <img src="assets/img/city.png" width="200px" />
  </app-card>`,
  standalone: true,
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
    this.http.fetchCities$.subscribe((c) => this.store.addAll(c));
    this.store.cities$.subscribe((c) => (this.cities = c));
  }

  addNewCity(): void {
    this.store.addOne(randomCity());
  }

  deleteCity(id: number): void {
    this.store.deleteOne(id);
  }
}
