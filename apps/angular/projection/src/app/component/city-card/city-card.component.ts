import { Component, OnInit } from '@angular/core';
import {
  FakeHttpService,
  randomCity,
} from '../../data-access/fake-http.service';
import { CardComponent } from '../../ui/card/card.component';
import { City } from '../../model/city.model';
import { CityStore } from '../../data-access/city.store';

@Component({
  selector: 'app-city-card',
  template: ` <app-card
    [list]="cities"
    customClass="bg-light-blue"
    imageSrc="/assets/img/city.png"
    (deleteEvent)="deleteCity($event)"
    (addItemEvent)="addNewCity()">
  </app-card>`,
  standalone: true,
  imports: [CardComponent],
})
export class CityCardComponent implements OnInit {
  cities: City[] = [];

  constructor(
    private http: FakeHttpService,
    private store: CityStore,
  ) {}

  ngOnInit(): void {
    this.http.fetchCities$.subscribe((c) => this.store.addAll(c));

    this.store.cities$.subscribe((c) => (this.cities = c));
  }

  addNewCity() {
    this.store.addOne(randomCity());
  }

  deleteCity(id: number) {
    this.store.deleteOne(id);
  }
}
