import { NgForOf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CityStore } from '../../data-access/city.store';
import {
  FakeHttpService,
  randomCity,
} from '../../data-access/fake-http.service';
import { City } from '../../model/city.model';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-city-card',
  template: `
    <app-card customClass="bg-light-green" (addMoreEvent)="addOne()">
      <img src="assets/img/city.png" width="200px" />
      <app-list-item
        (deleteEvent)="remove($event)"
        *ngFor="let item of cities"
        [name]="item.name"
        [id]="item.id"></app-list-item>
    </app-card>
  `,
  standalone: true,
  imports: [CardComponent, ListItemComponent, NgForOf],
})
export class CityCardComponent implements OnInit {
  cities: City[] = [];

  constructor(
    private http: FakeHttpService,
    private store: CityStore,
  ) {}

  ngOnInit(): void {
    this.http.fetchCities$.subscribe((t) => this.store.addAll(t));

    this.store.cities$.subscribe((t) => (this.cities = t));
  }

  addOne() {
    this.store.addOne(randomCity());
  }

  remove(id: number) {
    this.store.deleteOne(id);
  }
}
