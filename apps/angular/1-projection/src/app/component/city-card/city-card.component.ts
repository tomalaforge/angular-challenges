import { Component, OnInit } from '@angular/core';
import { CardComponent } from '../../ui/card/card.component';
import { City } from '../../model/city.model';
import { CityStore } from '../../data-access/city.store';
import {
  FakeHttpService,
  randomCity,
} from '../../data-access/fake-http.service';

@Component({
  selector: 'app-city-card',
  template: ` <app-card
    [list]="cities"
    customClass="bg-light-pink"
    (addItem)="addNewItem()"
    (deleteItem)="deleteItem($event)">
    <img src="assets/img/city.jpg" width="200px" />
  </app-card>`,
  standalone: true,
  imports: [CardComponent],
})
export class CityCardComponent implements OnInit {
  cities: City[] = [];

  constructor(private store: CityStore, private http: FakeHttpService) {}

  ngOnInit(): void {
    this.http.fetchCities$.subscribe((s) => this.store.addAll(s));
    this.store.cities$.subscribe((s) => (this.cities = s));
  }

  addNewItem() {
    this.store.addOne(randomCity());
  }

  deleteItem(id: number) {
    this.store.deleteOne(id);
  }
}
