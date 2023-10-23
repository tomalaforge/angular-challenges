import { Component, OnInit } from '@angular/core';
import { CityStore } from '../../data-access/city.store';
import { CardComponent } from '../../ui/card/card.component';
import { City } from '../../model/city.model';
import {
  FakeHttpService,
  randomCity,
} from '../../data-access/fake-http.service';

@Component({
  selector: 'app-city-card',
  template: `<app-card
    [list]="cities"
    itemNameKey="name"
    (onAddNewItem)="addNewCity()"
    (onDelete)="delete($event)"
    customClass="bg-light-blue">
    <img src="assets/img/student.webp" width="200px" />
  </app-card>`,
  standalone: true,
  imports: [CardComponent],
})
export class CityCardComponent implements OnInit {
  cities: City[] = [];

  constructor(private store: CityStore, private http: FakeHttpService) {}

  ngOnInit(): void {
    this.http.fetchCities$.subscribe((cities) => this.store.addAll(cities));

    this.store.cities$.subscribe((cities) => (this.cities = cities));
  }

  addNewCity() {
    this.store.addOne(randomCity());
  }

  delete(id: number) {
    this.store.deleteOne(id);
  }
}
